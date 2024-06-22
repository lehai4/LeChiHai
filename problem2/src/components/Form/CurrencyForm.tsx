import imageArr from "@/mockApi";
import { CurrencyType, FieldType, ResponseType } from "@/type";
import {
  Button,
  Divider,
  Form,
  FormProps,
  Input,
  Select,
  SelectProps,
  Space,
  Typography,
} from "antd";
import { valueType } from "antd/es/statistic/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CurrencyForm = () => {
  const [form] = Form.useForm();
  const [currency, setCurrency] = useState<CurrencyType[]>([]);
  const [response, setResponse] = useState<ResponseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [outputCurrency, setOutputCurrency] = useState<valueType>();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setLoading(true);
    setTimeout(() => {
      const { fromCurrency, fromCurrencyValue, toCurrency } = values;

      const getFromCurrencyInfo: ResponseType | undefined = response.find(
        (c) => c.currency === fromCurrency
      );

      const getToCurrencyInfo: ResponseType | undefined = response.find(
        (c) => c.currency === toCurrency
      );

      if (getFromCurrencyInfo && getToCurrencyInfo) {
        const ratio = getFromCurrencyInfo.price / getToCurrencyInfo.price;
        const result = Number(fromCurrencyValue) * ratio;

        setOutputCurrency(result);
        setLoading(false);
        toast.success("Exchange rate successfully!");
      } else if (getFromCurrencyInfo === undefined && getToCurrencyInfo) {
        toast.error(`getFromCurrenInfo:${fromCurrency} no exist!`);
        form.resetFields();
        setOutputCurrency("");
        setLoading(false);
      } else if (getFromCurrencyInfo && getToCurrencyInfo === undefined) {
        toast.error(`getToCurrencyInfo:${toCurrency} no exist!`);
        form.resetFields();
        setOutputCurrency("");
        setLoading(false);
      }
    }, 2000);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    toast.error("please enter input field!");
  };

  const options: SelectProps["options"] = currency.map((c) => {
    return {
      label: c.name,
      value: c.name,
      emoji: c.src,
    };
  });

  useEffect(() => {
    const fetchApi = async () => {
      const [res] = await Promise.all([
        axios.get("https://interview.switcheo.com/prices.json"),
      ]);

      const response: ResponseType[] = res.data;

      if (res.status == 200) {
        setLoading(false);
        setResponse(response);

        const customCurrency = imageArr.filter((img) => {
          let c = img.name;
          const result = response.filter((res) => {
            if (res.currency === c) {
              return {
                currency: c,
                emoji: img.src,
              };
            }
          });
          return result;
        });
        setCurrency(customCurrency);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <Form
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        name="currenCy"
        layout="vertical"
        form={form}
      >
        <Form.Item<FieldType>
          label="FromCurrency"
          layout="vertical"
          name="fromCurrency"
          rules={[{ required: true, message: "Please input fromCurrency!" }]}
        >
          <Select
            autoFocus
            allowClear
            style={{ width: "100%" }}
            options={options}
            popupMatchSelectWidth={false}
            optionRender={(option) => (
              <Space>
                <img
                  src={option.data.emoji}
                  alt={option.data.label}
                  aria-label={option.data.label}
                />
                {option.data.label}
              </Space>
            )}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="FromCurrencyValue"
          layout="vertical"
          name="fromCurrencyValue"
          rules={[
            { required: true, message: "Please input fromCurrencyValue!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="ToCurrency"
          layout="vertical"
          name="toCurrency"
          rules={[{ required: true, message: "Please input toCurrency!" }]}
        >
          <Select
            style={{ width: "100%" }}
            options={options}
            optionRender={(option) => (
              <Space>
                <img
                  src={option.data.emoji}
                  alt={option.data.label}
                  aria-label={option.data.label}
                />
                {option.data.label}
              </Space>
            )}
          />
        </Form.Item>

        <div className="flex flex-row gap-4 justify-center items-center">
          <Form.Item className="m-0">
            <Button
              type="default"
              size="middle"
              onClick={() => {
                form.resetFields();
                setOutputCurrency("");
              }}
            >
              Reset
            </Button>
          </Form.Item>
          <Form.Item className="m-0">
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              loading={loading}
            >
              Exchange
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Divider />
      <div className="flex flex-row gap-2">
        <Typography.Text>Exchange rate: </Typography.Text>
        <Input
          value={outputCurrency}
          type="number"
          placeholder="outputCurrency"
          disabled
          size="middle"
          className="!text-gray-500"
        />
      </div>
    </>
  );
};
export default CurrencyForm;
