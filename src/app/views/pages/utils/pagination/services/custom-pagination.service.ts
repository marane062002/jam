import { Injectable } from '@angular/core';
import { Page } from '../page';
import { Pageable } from '../pageable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPaginationService {

  constructor() { }

  public getNextPage(page: Page<any>): Pageable {
    
    if (!page.last) {
      page!.pageable!.pageNumber = page!.pageable!.pageNumber + 1;
    }
    
    return page!.pageable;
  }

  public getPreviousPage(page: Page<any>): Pageable {
    if (!page.first) {
      page.pageable.pageNumber = page.pageable.pageNumber - 1;
    }
    return page.pageable;
  }

  public getPageInNewSize(page: Page<any>, pageSize: number): Pageable {
    page.pageable.pageSize = pageSize;
    page.pageable.pageNumber = Pageable.FIRST_PAGE_NUMBER;
    return page.pageable;
  }

  private messageStream = new BehaviorSubject<any>(new Page());

  currentMessage = this.messageStream.asObservable()
 
  getMessage(){
    return this.currentMessage
  }
  updateMessage(newMessage: any){
    this.messageStream.next(newMessage);
 
  }
}
