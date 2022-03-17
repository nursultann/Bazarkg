import React, { useState } from "react";
import { Form, Button, Input,InputNumber } from 'antd';
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
                : <></>}
               <div className="col-xl-6">
                  <div className="row">
                    <div className="col-xl-6">
                    <Form.Item
                    key={"price"}
                    label={"Цена от:"}
                    name={"price"}
                    rules={[{required:"", message:""}]}
                    >
                      <InputNumber id="price_at" placeholder="Цена от" initialValues={0} className="w-100 mb-2" />
                    </Form.Item>
                    </div>
                    <div className="col-xl-6">
                    <Form.Item
                    key={"price"}
                    label={"Цена до:"}
                    name={"price"}
                    rules={[{required: "", message:""}]}
                    >
                      <InputNumber id="price_to" placeholder="Цена до" initialValues={0} className="w-100 mb-2" />
                    </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12 d-xl-flex justify-content-end">
                <Button className="col-12 col-xl-2" onClick={onChange} style={{backgroundColor:"#4dab04",color:"#fff"}}>Поиск</Button>
              </div>
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

};
export default SubCategories;