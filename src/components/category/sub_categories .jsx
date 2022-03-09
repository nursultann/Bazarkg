import React, { useState } from "react";
<<<<<<< HEAD
import { Form, Button, Input } from 'antd';
import { CustomAttributeField } from "../custom_components";

const SubCategories = ({category, onSubmit}) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };

    const onChange = () => {
      if (onSubmit != null) onSubmit(form);
    };
    
    return(
      <>
        {category?.children?.length ?
          <>
          <div className="col-md-12 mt-3 pb-3">
          <label className="mb-3" style={{fontSize:18}}>Поиск</label>
            <Form
              form={form}
              name="advanced_search"
              className="ant-advanced-search-form"
              onFinish={onFinish}
            >
              <div className="row">
                {category?.custom_attribute != null ?  
                  category.custom_attribute.map((item) => (
                    <div className="col-xl-4">  
                      <Form.Item
                        key={item.name}
                        label={item.title}
                        name={item.name}
                        rules={[{required: item.is_required, message: item.placeholder}]}
                      >
                        {CustomAttributeField(item)}
                      </Form.Item>
                    </div>
                  ))
                : <>No attributes</>}
               <div className="col-xl-4">
                  <Form.Item
                  key={"price"}
                  label={"Цена от:"}
                  name={"price"}
                  rules={[{required: "", message:""}]}
                  >
                    <Input type="number"/>
                  </Form.Item>
                </div>
              </div>
              <Button onClick={onChange} style={{backgroundColor:"#4dab04",color:"#fff"}}>Поиск</Button>
            </Form>
          </div>
          <div className="col-md-12 py-2 bg-light">
            <label>По категориям</label>
            <div className="row">
              {category?.children?.map((category) =>
                <div className="col-3 col-md-2 mt-2 mt-md-2">
                  <a className="text-primary" href={`/category/${category.id}`}>
                    {category.name}
                  </a>
                </div>
              )}
            </div>    
          </div>
         </> 
        :
          <></>
        } 
      </>
    );
=======
import { Form, Button } from 'antd';
import { CustomAttributeField } from "../custom_components";

const SubCategories = ({ category, onSubmit }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const onChange = () => {
    if (onSubmit != null) onSubmit(form);
  };

  return (
    <>
      {category?.children?.length ?
        <div className="col-md-12 py-2 bg-light">
          <label>По категориям</label>
          <div className="row">
            {category?.children?.map((category) =>
              <div className="col-3 col-md-2 mt-2 mt-md-2">
                <a className="text-primary" href={`/category/${category.id}`}>
                  {category.name}
                </a>
              </div>
            )}
          </div>
        </div>
        :
        <div className="col-md-12 mt-3">
          <label className="mb-3" style={{ fontSize: 18 }}>Поиск</label>
          <Form
            form={form}
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
          >
            <div className="row">
              {category?.custom_attribute != null ?
                category.custom_attribute.map((item) => (
                  <div className="col-md-4">
                    <Form.Item
                      key={item.name}
                      label={item.title}
                      name={item.name}
                      rules={[{ required: item.is_required, message: item.placeholder }]}
                    >
                      {CustomAttributeField(item)}
                    </Form.Item>
                  </div>
                ))
                : <>No attributes</>}
            </div>
            <Button onClick={onChange}>Send</Button>
          </Form>
        </div>
      }
    </>
  );
>>>>>>> cdee08dcee277b1fc3d1e71e5d7e1a0fc45be23d

};

export default SubCategories;