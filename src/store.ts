import { create } from "zustand";

export interface ITreeNode {
    name: string;
    type: string;
    properties?: ITreeNode[];
    [key: string]: any;
}

const imageListComponent: ITreeNode[] = [
    {
        name: 'imageList',
        type: 'array',
        properties: [
            {
                name: 'title',
                type: 'string'
            },
            {
                name: 'url',
                type: 'string'
            },
        ],
    },
    {
        name: 'shopItem',
        type: 'object',
        properties: [
            {
                name: 'shopTitle',
                type: 'string'
            },
            {
                name: 'shopUrl',
                type: 'string'
            },
            {
                name: 'imageList1',
                type: 'array',
                properties: [
                    {
                        name: 'title1',
                        type: 'string'
                    },
                    {
                        name: 'url1',
                        type: 'string'
                    },
                    {
                        name: 'info',
                        type: 'object',
                        properties: [
                            {
                                name: 'titleObject',
                                type: 'string'
                            },
                            {
                                name: 'urlObject',
                                type: 'string'
                            },
                        ],
                    },
                ],
            },
        ],
    }
];
const treeData = [
    {
        value: 'mockImageList',
        label: 'mockImageList',
        children: [
            {
                value: 'mockImageList.title',
                label: 'title',
            },
            {
                value: 'mockImageList.url',
                label: 'url',
            },
        ],
    },
];
const mockData = {
    mockImageList: [
        {
            title: 'Image 1',
            url: 'https://example.com/image1.jpg',
        },
        {
            title: 'Image 2',
            url: 'https://example.com/image2.jpg',
        },
    ]
};

const findChildrenByKey = (key: string, treeData: any[]) => {
    for (let i = 0; i < treeData.length; i++) {
        const node = treeData[i];
        if (node.label === key) {
            return node.children;
        }
        if (node.children) {
            const children: any = findChildrenByKey(key, node.children);
            if (children) {
                return children;
            }
        }
    }
    return []
}

export interface ITreeFormStore {
    treeFormData: any;
    treeData: any;
    mockData: any;
    imageListComponent: any;
    setTreeFormData: (data: any) => void;
    getTreeData: (parentNodeKey: string) => any;
}

export const useTreeFormStore = create<ITreeFormStore>((set, get) => ({
    imageListComponent,
    treeFormData: JSON.parse(localStorage.getItem('treeFormData') || '{}'),
    treeData,
    mockData,
    setTreeFormData: (data: any) => {
        set({ treeFormData: data })
        localStorage.setItem('treeFormData', JSON.stringify(data));
    },
    getTreeData: (parentNodeKey: string) => {
        return findChildrenByKey(get().treeFormData[parentNodeKey], treeData)
    },
}));
