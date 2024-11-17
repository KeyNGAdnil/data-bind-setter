import { TreeSelect, Form, Input } from '@alifd/next';
import { ITreeNode } from './store';
import { useTreeFormStore } from './store'

const FormItem = Form.Item;


export const generateTree = (propLists: ITreeNode[], parentNodeList: ITreeNode[] | null) => {
    return propLists.map((prop: ITreeNode) => {

        const nameList = parentNodeList?.length ?
            [...parentNodeList, prop].map(i => i.name).join('_') : prop.name;

        const chilParentNodeList = parentNodeList?.length ? [...parentNodeList, prop] : [prop]

        const childTreeComp: any = prop.properties ? generateTree(prop.properties, chilParentNodeList) : null;

        return (
            <>
                {TreeComponent(prop, parentNodeList, nameList)}
                <div style={{ marginLeft: 20 }}>
                    {childTreeComp}
                </div>
            </>
        )
    })
}

export const TreeComponent = (node: ITreeNode, parentNodeList: ITreeNode[] | null, nameList: string) => {
    console.log(node.name, parentNodeList);

    const defaultTreeData = useTreeFormStore((state) => state.treeData);
    const getTreeData = useTreeFormStore((state) => state.getTreeData);
    const dataSource = (parentNodeList?.length && parentNodeList[parentNodeList.length - 1].type === 'array') ?
        getTreeData(parentNodeList.map(i => i.name).join('_')) : defaultTreeData;

    return (
        <FormItem
            label={<div>{`${node.name} (${node.type})`}</div>}
            name={nameList}
        >
            {node.type !== 'object' && <TreeSelect treeDefaultExpandAll={true} dataSource={dataSource} />}
        </FormItem >
    )
}