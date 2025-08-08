import React, { useState, useEffect } from "react";
import { Form, Select, Input } from "antd";

const { Option } = Select;

const AddressFields = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceName, setProvinceName] = useState('');
  const [districtName, setDistrictName] = useState('');
  const [wardName, setWardName] = useState('');
  const form = Form.useFormInstance();

  useEffect(() => {
    const fetchProvinces = async () => {
      const data = await fetch(
        "http://localhost:5000/api/address/provinces"
      ).then((res) => res.json());
      setProvinces(data);
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = async (value, option) => {
    setProvinceName(option.children); // Lưu tên tỉnh
    form.setFieldsValue({ province: option.children }); // Gán vào form nếu muốn
    const data = await fetch(
      `http://localhost:5000/api/address/districts?provinceCode=${value}`
    ).then((res) => res.json());
    setDistricts(data);
    setWards([]);
    setDistrictName('');
    setWardName('');
    form.setFieldsValue({
      districtCode: undefined,
      wardCode: undefined,
      district: undefined,
      ward: undefined,
    });
  };

  const handleDistrictChange = async (value, option) => {
    setDistrictName(option.children); // Lưu tên quận
    form.setFieldsValue({ district: option.children });
    const provinceCode = form.getFieldValue("provinceCode");
    const data = await fetch(
      `http://localhost:5000/api/address/wards?provinceCode=${provinceCode}&districtCode=${value}`
    ).then((res) => res.json());
    setWards(data);
    setWardName('');
    form.setFieldsValue({ wardCode: undefined, ward: undefined });
  };

  const handleWardChange = (value, option) => {
    setWardName(option.children); // Lưu tên phường
    form.setFieldsValue({ ward: option.children });
  };

  return (
    <>
      {/* Ẩn các trường province, district, ward (tên) nếu không muốn user nhập thủ công */}
      <Form.Item name="province" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name="district" style={{ display: 'none' }}>
        <Input />
      </Form.Item>
      <Form.Item name="ward" style={{ display: 'none' }}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Tỉnh / Thành phố"
        name="provinceCode"
        rules={[{ required: true, message: "Chọn tỉnh/thành phố" }]}
      >
        <Select
          showSearch
          placeholder="Chọn tỉnh/thành phố"
          optionFilterProp="children"
          onChange={handleProvinceChange}
        >
          {provinces.map((p) => (
            <Option key={p.Code} value={p.Code}>
              {p.FullName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Quận / Huyện"
        name="districtCode"
        rules={[{ required: true, message: "Chọn quận/huyện" }]}
      >
        <Select
          showSearch
          placeholder="Chọn quận/huyện"
          optionFilterProp="children"
          onChange={handleDistrictChange}
          disabled={!districts.length}
        >
          {districts.map((d) => (
            <Option key={d.Code} value={d.Code}>
              {d.FullName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Phường / Xã"
        name="wardCode"
        rules={[{ required: true, message: "Chọn phường/xã" }]}
      >
        <Select
          showSearch
          placeholder="Chọn phường/xã"
          optionFilterProp="children"
          onChange={handleWardChange}
          disabled={!wards.length}
        >
          {wards.map((w) => (
            <Option key={w.Code} value={w.Code}>
              {w.FullName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Tên đường / Số nhà"
        name="street"
        rules={[{ required: true, message: "Nhập tên đường / số nhà" }]}
      >
        <Input placeholder="123 Đường ABC" />
      </Form.Item>
    </>
  );
};

export default AddressFields;