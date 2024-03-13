import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
// import { ImageTypes } from './image-types';
import { AspectRatioValues } from './aspect-ratio-values';
import { DragModes } from './drag-modes.enum';
import { CropperData } from './cropper-data';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageTypes } from './image-types';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { ImageScan } from './image-scan'
import { AbstractControl, FormBuilder, FormControl, FormGroupName, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: 'kt-scanned-image',
  templateUrl: './scanned-image.component.html',
  styleUrls: ['./scanned-image.component.scss']
})
export class ScannedImageComponent implements OnInit, AfterViewInit, OnDestroy {


  ngOnInit(): void {
    this.connectToSocket();
  
	const WebSocket = require('ws');
	const wsImpl = WebSocket;
	this.ws = new wsImpl(this.wsUrl);
  
	this.ws.onmessage = (e) => {
	  if (e.data instanceof Blob) {
		const reader = new FileReader();
		reader.readAsDataURL(e.data);
		reader.onloadend = () => {
		  const base64data = reader.result as string;
		  console.log(base64data);
		};
	  }
	  // else {
	  //   let msg = JSON.parse(e.data);
	  //   console.log(msg);
	  // }
	};

}

  constructor( private fb: FormBuilder){}




  @Output() onSaveScannedImage = new EventEmitter<any>();
	@Input() width: Number = 200;
	//@Input() height: Number = 600;

	@Input() wsServerPort: number = 61024;
	imageScan : ImageScan;
	private wsUrl: string = `ws://localhost:${this.wsServerPort}`;

	base64Img: any = "";
	scannedImageUrl: SafeUrl = "";
	private ws: WebSocket = null;
	startScanning: boolean;

	private reconnecteOnWSClose: boolean = true;
	private wsReconnectDuration: number = 100;
	isConnectedToScanner: boolean = false;
	@Output() onScannerConnectionStateChange = new EventEmitter<boolean>(false);

	errorMessage: String = "";

	@Input() enableImageCropper: boolean = false;
	cropperImageType: ImageTypes = ImageTypes.JPEG;
	showImageCropper: boolean = false;
	// @ViewChild('imageCropperC') imageCropper: ImageCropperComponent;

	tableScane:any =[]


	ngAfterViewInit(): void {
	}

	ngOnDestroy(): void {
		this.closeWebSocketConnection();
	}

	startScan(): void {
		try {this.removeScannedImage();
			if(this.ws.readyState == WebSocket.OPEN){
				this.showImageCropper = false;
				this.removeScannedImage();
				this.ws.send("1100");
				this.startScanning = true;
				// this.loading = true
			}
		} catch (error) {
			// this.errorMessage = "Allumez votre scanner";
		}
	}

	getDone(): void {

	}

	private  connectToSocket = (): void => {
		try {
			this.ws = null;
			if(!this.ws){
				try {
					this.ws = new WebSocket(this.wsUrl);
				} catch (error) {

				}

				this.ws.onopen = (e) => {
					this.changeScannerConnectionState(true);
					this.errorMessage = '';
				}
				this.ws.onerror = (e) => {
					this.errorMessage = "Lancez l'application middleware du scanner";
					this.ws.close();
				}
				this.ws.onmessage = (e) => {
					if (e.data instanceof Blob) {
						var reader = new FileReader();
						reader.readAsDataURL(e.data);
						reader.onloadend = () => {
							this.base64Img = reader.result;
							if (this.base64Img != null) {
								this.imageScan = {
									imageBase64: this.base64Img
								}
								console.log(this.base64Img)
								// let pdf1 = new PdfClass(this.base64Img, this.pjForm.value.fileName);
		 						//  this.tapbleuPdf.push(pdf1);


							// 	this.tableScane.push({file: this.base64Img,
							// 		fileName: this.pjForm.value.fileName})
		  					// console.log(this.tableScane)
							//   this.loading = false
							}
							// this.gestionDocumentService.Add("detect-face",this.imageScan).subscribe(res=>{
							// 	let f = res.body as ImageScan;
							// 	this.base64Img = f.imageBase64;
							// 	this.scannedImageUrl = this.sanitizer.bypassSecurityTrustUrl(this.base64Img + "");
							// 	if(this.enableImageCropper){
							// 		this.showImageCropper = true;
							// 	}
							// 	this.startScanning = false;

							// },  (error) => {
							// 	let errorMessage;
							// 	if (error.status === 500 || error.status === 404) {
							// 	  errorMessage = 'Une erreur est survenue, merci de réessayer plus tard';
							// 	} else if (error.error && error.error.message) {
							// 	  errorMessage = error.error.message;
							// 	}

							// 	this.messageService.add({
							// 	  severity: 'error',
							// 	  summary: errorMessage,
							// 	  life: 5000
							// 	});
							//   });

						}
					}
					// else{
					//     let msg = JSON.parse(e.data);
					// }
				};
				this.ws.onclose = (e) => {
					this.changeScannerConnectionState(false);
					if(this.reconnecteOnWSClose){
						setTimeout(() => {
							this.connectToSocket();
						}, this.wsReconnectDuration);
					}
				}
			}
		} catch (error) {
			setTimeout(() => {
				this.connectToSocket();
			}, this.wsReconnectDuration);
		}
	}

	private closeWebSocketConnection(): void {
		this.reconnecteOnWSClose = false;

		if(this.ws.OPEN){
			setTimeout(() => {
				this.ws.close();
			}, this.wsReconnectDuration);
		}
	}

	private changeScannerConnectionState(state: boolean): void {
		this.isConnectedToScanner = state;
		this.onScannerConnectionStateChange.emit(this.isConnectedToScanner);
	}

	removeScannedImage(): void {
		this.base64Img = "";
		this.scannedImageUrl = "";
	}

	compressImage(src, newX, newY) {
		return new Promise((res, rej) => {
		  const img = new Image();
		  img.src = src;
		  img.onload = () => {
			const elem = document.createElement('canvas');
			elem.width = newX;
			elem.height = newY;
			const ctx = elem.getContext('2d');
			ctx.drawImage(img, 0, 0, newX, newY);
			const data = ctx.canvas.toDataURL();
			res(data);
		  }
		  img.onerror = error => rej(error);
		})
	  }

}