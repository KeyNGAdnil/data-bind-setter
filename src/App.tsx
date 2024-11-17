import React from 'react';
import { TreeSelect, Form, Input, Button } from '@alifd/next';
import { generateTree } from './TreeCompontent';
import './App.css';
import '@alifd/next/dist/next.css';
import { useTreeFormStore } from './store'


const App = () => {
  const imageListComponent = useTreeFormStore((state) => state.imageListComponent)
  const treeFormData = useTreeFormStore((state) => state.treeFormData)
  const setTreeFormData = useTreeFormStore((state) => state.setTreeFormData)
  function onChange(values: any) {
    console.log('onChange Success:', values);
    setTreeFormData(values)
  }

  return (
    <div className="content">
      <Form
        name="basic"
        style={{ width: 300 }}
        onChange={onChange}
        value={treeFormData}
      >
        {generateTree(imageListComponent, null)}

        <Form.Item
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;