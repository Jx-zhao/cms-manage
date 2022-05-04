import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

const CollectionCreateForm = ({ visible, onCreate, onCancel,titles,descriptions }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="填写文章标题"
      okText="提交"
      cancelText="取消"
      zIndex={99999}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
          title:titles,
          description:descriptions
        }}
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[
            {
              required: true,
              message: '请填写标题!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item name="description" label="副标题">
          <Input type="textarea"/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CollectionsPage = (props) => {
  const [visible, setVisible] = useState(false);
  const onCreate = (values) => {
    props.onSubmit(values);
    // console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        {props.name}
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        titles = {props.values}
        descriptions = {props.subtitle}
      />
    </div>
  );
};

export default CollectionsPage;