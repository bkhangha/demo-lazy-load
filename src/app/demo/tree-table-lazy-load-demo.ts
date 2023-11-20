import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../../service/nodeservice';

interface Column {
    field: string;
    header: string;
}

@Component({
    selector: 'tree-table-lazy-load-demo',
    templateUrl: './tree-table-lazy-load-demo.html'
})
export class TreeTableLazyLoadDemo implements OnInit{
    files!: TreeNode[];

    cols!: Column[];

    totalRecords!: number;

    loading: boolean = false;

    constructor(private nodeService: NodeService, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.totalRecords = 1000;

        this.loading = true;
    }

    loadNodes(event: any) {
        this.loading = true;

        setTimeout(() => {
            this.files = [];

            for (let i = 0; i < event.rows; i++) {
                let node = {
                    data: {
                        name: 'Item ' + (event.first + i),
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'Type ' + (event.first + i)
                    },
                    leaf: false
                };

                this.files.push(node);
            }
            this.loading = false;
            this.cd.markForCheck();
        }, 1000);
    }

    onNodeExpand(event: any) {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
            const node = event.node;

            node.children = [
                {
                    data: {
                        name: node.data.name + ' - 0',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                },
                {
                    data: {
                        name: node.data.name + ' - 1',
                        size: Math.floor(Math.random() * 1000) + 1 + 'kb',
                        type: 'File'
                    }
                }
            ];

            this.files = [...this.files];
        }, 250);
    }
}