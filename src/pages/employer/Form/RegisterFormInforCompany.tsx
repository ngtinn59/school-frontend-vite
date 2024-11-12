import { useQuery } from "@tanstack/react-query";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import {
  getCitiesApi,
  getCompanySizesApi,
  getCompanyTypesApi,
  getCountriesApi,
  getDistrictsApi,
} from "../../../services/api/publicApi";
import {
  CityType,
  CompanySizeType,
  CompanyType,
  CountryType,
  DistrictType,
} from "../../../utils/type";

interface RegisterFormInforCompanyProps {
  form: any;
  selectCountryId: number;
  setSelectCountryId: (value: number) => void;
  selectCityId: number;
  setSelectCityId: (value: number) => void;
}

const RegisterFormInforCompany: React.FC<RegisterFormInforCompanyProps> = ({
  form,
  selectCountryId,
  setSelectCountryId,
  selectCityId,
  setSelectCityId,
}) => {
  const { data: companyTypes } = useQuery({
    queryKey: ["companyTypes"],
    queryFn: () => getCompanyTypesApi(),
    select: (companyTypesData) =>
      companyTypesData.data.map((item: CompanyType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: companySizes } = useQuery({
    queryKey: ["companySizes"],
    queryFn: () => getCompanySizesApi(),
    select: (companySizesData) =>
      companySizesData.data.map((item: CompanySizeType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: countryOptions } = useQuery({
    queryKey: ["countries"],
    queryFn: () => getCountriesApi(),
    select: (countryData) =>
      countryData.data.map((item: CountryType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: cityOptions } = useQuery({
    queryKey: ["cities", selectCountryId],
    queryFn: () => getCitiesApi(selectCountryId),
    enabled: !!selectCountryId && selectCountryId !== 0,
    select: (cityData) =>
      cityData.data.map((item: CityType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  const { data: districtOptions } = useQuery({
    queryKey: ["districts", form.getFieldValue("city_id")],
    queryFn: () => getDistrictsApi(selectCityId),
    enabled: !!selectCityId && selectCityId !== 0,
    select: (districtData) =>
      districtData.data.map((item: DistrictType) => ({
        value: item.id,
        label: item.name,
      })),
  });

  return (
    <>
      <Form.Item
        name="company_name"
        label="Tên công ty"
        rules={[{ required: true, message: "Vui lòng nhập tên công ty!" }]}
        hasFeedback
      >
        <Input placeholder="Tên công ty" />
      </Form.Item>
      <Form.Item
        label="Email công ty"
        name="company_email"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập email công ty!",
          },
          {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Email không hợp lệ!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Email công ty" />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="tax_code"
            label="Mã số thuế"
            rules={[
              { required: true, message: "Vui lòng nhập mã số thuế!" },
              {
                pattern: /^\d{10}(-\d{3})?$/,
                message: "Mã số thuế không hợp lệ!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Mã số thuế" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="date_of_establishment"
            label="Ngày thành lập"
            rules={[
              { required: true, message: "Vui lòng chọn ngày thành lập!" },
            ]}
            hasFeedback
          >
            <DatePicker
              style={{ width: "100%" }}
              format="DD/MM/YYYY"
              placeholder="Ngày thành lập"
            />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item
            name="company_type_id"
            label="Loại công ty"
            rules={[{ required: true, message: "Vui lòng chọn loại công ty!" }]}
            hasFeedback
          >
            <Select placeholder="Loại công ty">
              {companyTypes?.map((item: any) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="company_size_id"
            label="Quy mô công ty"
            rules={[
              { required: true, message: "Vui lòng chọn quy mô công ty!" },
            ]}
            hasFeedback
          >
            <Select placeholder="Quy mô công ty">
              {companySizes?.map((item: any) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item
            name="website"
            label="Website công ty"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập link website công ty!",
              },
              {
                pattern:
                  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/,
                message: "Link website không hợp lệ!",
              },
              {
                max: 255,
                message: "Website không được vượt quá 255 ký tự!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Website công ty" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="country_id"
            label="Quốc gia"
            rules={[{ required: true, message: "Vui lòng chọn quốc gia!" }]}
            hasFeedback
          >
            <Select
              placeholder="Chọn quốc gia"
              onChange={(value) => {
                setSelectCountryId(value);
                form.setFieldsValue({
                  district_id: null,
                  city_id: null,
                });
              }}
            >
              {countryOptions?.map((item: any) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="city_id"
            label="Thành phố"
            initialValue={selectCityId === 0 ? null : selectCityId}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thành phố!",
              },
            ]}
            hasFeedback
          >
            <Select
              placeholder="Chọn thành phố"
              onChange={(value) => {
                setSelectCityId(value);
                form.setFieldsValue({
                  district_id: null,
                });
              }}
            >
              {cityOptions?.map((item: any) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="district_id"
            label="Quận/Huyện"
            initialValue={selectCityId === 0 ? null : selectCityId}
            rules={[
              {
                required: true,
                message: "Vui lòng chọn quận/huyện!",
              },
            ]}
            hasFeedback
          >
            <Select placeholder="Chọn quận huyện">
              {districtOptions?.map((item: any) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="address"
        label="Đia chỉ"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập địa chỉ!",
          },
        ]}
        hasFeedback
      >
        <Input placeholder="Địa chỉ" />
      </Form.Item>
    </>
  );
};

export default RegisterFormInforCompany;
