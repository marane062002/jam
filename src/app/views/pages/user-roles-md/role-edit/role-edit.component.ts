import {
	CollectionViewer,
	SelectionChange,
	SelectionModel,
} from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material";
import {
	Component,
	Injectable,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
} from "@angular/core";
import { BehaviorSubject, merge, Observable, of as observableOf } from "rxjs";
import { map } from "rxjs/operators";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { AuthService } from "../../../../core/auth";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * File node data with nested structure.
 * Each node has a filename, and a type or a list of children.
 */
export class FileNode {
	children: FileNode[];
	filename: string;
	type: any;
}

/** Flat node with expandable and level information */
export class FileFlatNode {
	id:number;
	constructor(
		public expandable: boolean,
		public filename: string,
		public level: number,
		public type: any
	) {
	}
}

/**
 * The file structure tree data in string. The data could be parsed into a Json object
 */

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
/**
 * Node for to-do item
 */
export class TodoItemNode {
	children: TodoItemNode[];
	item: string;

	id: number;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
	item: string;
	id: number;

	level: number;
	expandable: boolean;
}

/**
 * Checklist database, it can build a tree structured Json object.
 * Each node in Json object represents a to-do item or a category.
 * If a node is a category, it has children items and new items can be added under the category.
 */
@Injectable()
export class ChecklistDatabase {
	dataChange = new BehaviorSubject<TodoItemNode[]>([]);

	get data(): TodoItemNode[] {
		if (this.dataChange) {
			return this.dataChange.value;
		}

		return undefined;
	}

	constructor(private service: AuthService) {
		this.initialize();
	}

	initialize() {
		// Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
		//     file node as children.
		this.service.getAllPermissions().subscribe(
			(permissions) => {
				const data = this.buildFileTree(permissions, 0);
				console.log("Permissions : " + JSON.stringify(permissions,null,2));
				// Notify the change.
				this.dataChange.next(data);
			},
			(error) => console.log(error)
		);
	}

	/**
	 * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
	 * The return value is the list of `TodoItemNode`.
	 */
	buildFileTree(obj: any, level: number): TodoItemNode[] {
		let tree_data0: TodoItemNode[] = [];
		let tree_data1: TodoItemNode[] = [];
		let tree_data2: TodoItemNode[] = [];

		obj.forEach((permission) => {
			switch (permission.level) {
				case 0: {
					let node0 = new TodoItemNode();
					node0.item = permission.title;
					node0.id = permission.id;
					node0.children = tree_data1;
					tree_data0.push(node0);
					tree_data1 = [];
					break;
				}
				case 1: {
					let node1 = new TodoItemNode();
					node1.item = permission.title;
					node1.id = permission.id;
					node1.children = tree_data2;
					tree_data1.push(node1);
					tree_data2 = [];

					break;
				}
				case 2: {
					let node2 = new TodoItemNode();
					node2.item = permission.title;
					node2.id = permission.id;
					tree_data2.push(node2);

					break;
				}
			}
		});

		return tree_data0;
	}

	/** Add an item to to-do list */
	insertItem(parent: TodoItemNode, name: string) {
		if (parent.children) {
			parent.children.push({ item: name } as TodoItemNode);
			this.dataChange.next(this.data);
		}
	}

	updateItem(node: TodoItemNode, name: string) {
		node.item = name;
		this.dataChange.next(this.data);
	}
}

@Component({
	selector: "kt-role-edit",
	templateUrl: "./role-edit.component.html",
	styles: [
		`
			.example-tree-progress-bar {
				margin-left: 30px;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.Default,
	providers: [ChecklistDatabase],
})
export class RoleEditComponent implements OnInit {
	roleForm: FormGroup;
	id:number;
	loading = false;
	/** Map from flat node to nested node. This helps us finding the nested node to be modified */
	flatNodeMap3 = new Map<TodoItemFlatNode, TodoItemNode>();

	/** Map from nested node to flattened node. This helps us to keep the same object for selection */
	nestedNodeMap3 = new Map<TodoItemNode, TodoItemFlatNode>();

	/** A selected parent node to be inserted */
	selectedParent3: TodoItemFlatNode | null = null;

	/** The new item's name */
	newItemName3 = "";

	treeControl3: FlatTreeControl<TodoItemFlatNode>;
	treeFlattener3: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;
	dataSource3: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

	/** The selection for checklist */
	checklistSelection3 = new SelectionModel<TodoItemFlatNode>(
		true /* multiple */
	);

	constructor(
		private database3: ChecklistDatabase,
		private fb: FormBuilder,
		private service: AuthService,
		private router: Router,
		private route: ActivatedRoute,
	) {

		this.treeFlattener3 = new MatTreeFlattener(
			this.transformer3,
			this.getLevel3,
			this.isExpandable3,
			this.getChildren3
		);
		this.treeControl3 = new FlatTreeControl<TodoItemFlatNode>(
			this.getLevel3,
			this.isExpandable3
		);
		this.dataSource3 = new MatTreeFlatDataSource(
			this.treeControl3,
			this.treeFlattener3
		);
		database3.dataChange.subscribe((data) => {
			this.dataSource3.data = data;
		});
	}

	creatFormGroup(formBuilder: FormBuilder){
		return formBuilder.group({
			 id:[null],
			 title: ["", Validators.required],
			 description: [""],
			 coreRole: [false],
			 permissions: new FormArray([]),
		   })



	 }

	ngOnInit() {
		// this.route.queryParams.subscribe(params => {
		// 	this.id= params['id'];
		// })
		this.id = this.route.snapshot.params['id'];
		console.log("Id role "+ this.id);
		this.roleForm = this.creatFormGroup(this.fb);
		this.service
			.getRoleById(this.id)
			.subscribe(data => {
				console.log("Liste Roles: "+ JSON.stringify(data,null,2));
				this.roleForm.patchValue(data);
			})
	}


	get role() {
		return this.roleForm ? this.roleForm.controls : null;
	}
	get permission() {
		return this.role ? (this.role.permissions as FormArray) : null;
	}
	getLevel3 = (node: TodoItemFlatNode) => node.level;
	isExpandable3 = (node: TodoItemFlatNode) => node.expandable;
	getChildren3 = (node: TodoItemNode): TodoItemNode[] => node.children;
	hasChild3 = (_: number, _nodeData: TodoItemFlatNode) =>
		_nodeData.expandable;
	hasNoContent3 = (_: number, _nodeData: TodoItemFlatNode) =>
		_nodeData.item === "";

	/**
	 * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
	 */
	transformer3 = (node: TodoItemNode, level: number) => {
		const existingNode = this.nestedNodeMap3.get(node);
		const flatNode =
			existingNode && existingNode.item === node.item
				? existingNode
				: new TodoItemFlatNode();
		flatNode.item = node.item;
		flatNode.level = level;
		flatNode.id = node.id;

		flatNode.expandable = !!node.children;
		this.flatNodeMap3.set(flatNode, node);
		this.nestedNodeMap3.set(node, flatNode);
		return flatNode;
	};

	/** Whether all the descendants of the node are selected */
	descendantsAllSelected3(node: TodoItemFlatNode): boolean {
		const descendants = this.treeControl3.getDescendants(node);
		return descendants.every((child) =>
			this.checklistSelection3.isSelected(child)
		);
	}

	/** Whether part of the descendants are selected */
	descendantsPartiallySelected3(node: TodoItemFlatNode): boolean {
		const descendants = this.treeControl3.getDescendants(node);
		const result = descendants.some((child) =>
			this.checklistSelection3.isSelected(child)
		);
		if (result) this.checklistSelection3.select(node);
		else this.checklistSelection3.deselect(node);
		return result && !this.descendantsAllSelected3(node);
	}

	/** Toggle the to-do item selection. Select/deselect all the descendants node */
	todoItemSelectionToggle3(node: TodoItemFlatNode): void {
		this.checklistSelection3.toggle(node);
		const descendants = this.treeControl3.getDescendants(node);
		this.checklistSelection3.isSelected(node)
			? this.checklistSelection3.select(...descendants)
			: this.checklistSelection3.deselect(...descendants);
	}

	/** Save the node to database */
	saveNode3(node: TodoItemFlatNode, itemValue: string) {
		const nestedNode = this.flatNodeMap3.get(node);
		// tslint:disable-next-line:no-non-null-assertion
		this.database3.updateItem(nestedNode!, itemValue);
	}

	onSubmit() {
		const controls = this.roleForm.controls;
		/** check form */
		if (this.roleForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.loading = true;
		const values = this.checklistSelection3.selected;

		values.forEach((p) => {
			this.addPermission(p.id);
		});
		const formValues = this.roleForm.value;
		const role: any = Object.assign({}, formValues);

		this.service.updateRole(role).subscribe(
			(data) => {
				this.router.navigate(["user/role-index"]);
				this.loading = true;
			},
			(error) => console.log(error)
		);
	}
	addPermission(id) {
		this.permission.push(this.fb.group({ id: [id] }));
	}

	backList() {
		this.router.navigate(["user/role-index"]);
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.roleForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}
