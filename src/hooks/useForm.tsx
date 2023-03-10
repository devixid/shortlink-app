/* eslint-disable no-unused-vars */
import type {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes
} from "react";
import { useState } from "react";

export interface ReturnDataTypes {
  [key: string]: string | boolean;
}

interface UseFormReturnTypes {
  register: (
    name: string,
    options?: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  setForm: (name: string, value: string) => void;
  reset: () => void;
  data: ReturnDataTypes;
}

interface UseFormDataTypes {
  name: string;
  value: string;
}

function useForm<T>(): UseFormReturnTypes {
  const [data, setData] = useState<UseFormDataTypes[]>([]);

  const register = (
    name: string,
    options?: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => {
    if (!data.find((item) => item.name === name)) {
      setData((prevData) => [
        ...prevData,
        {
          name,
          value: ""
        }
      ]);
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setData((prevData) =>
        prevData.map((item) => {
          if (item.name === name) {
            return {
              ...item,
              value
            };
          }

          return item;
        })
      );
    };

    return {
      name,
      value: data.find((item) => item.name === name)?.value,
      onChange: options?.onChange || onChange,
      ...options
    };
  };

  const reset = () => {
    setData((prevData) =>
      prevData.map((item) => ({
        ...item,
        value: ""
      }))
    );
  };

  const setForm = (name: string, value: any) => {
    const findObj = !!data.find((item) => item.name === name);

    if (!findObj) {
      // eslint-disable-next-line no-console
      console.error(`useForm: Key '${name}' not found`);
      return;
    }

    setData((prevData) =>
      prevData.map((item) => {
        if (item.name === name) {
          return {
            ...item,
            value
          };
        }

        return item;
      })
    );
  };

  const formState =
    data.length > 0
      ? data.reduce(
          (obj, item) =>
            Object.assign(obj, {
              [item.name]: item.value
            }),
          {}
        )
      : {};

  return {
    register,
    reset,
    setForm,
    data: formState
  };
}

export default useForm;
