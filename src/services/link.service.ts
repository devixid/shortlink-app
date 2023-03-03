import { Notif } from "@/utils";
import redaxios from "redaxios";

export interface CreateShortlinkData {
  url: string;
  slug: string;
  is_secret: boolean;
  key: string;
}

export async function createShortlink(
  url: string,
  data: CreateShortlinkData
): Promise<any> {
  const response = await redaxios
    .post(url, data)
    .then((res) => {
      if (res.status === 201) {
        Notif.success(
          res.data.data?.message ||
            res.data.message ||
            "Successfully created a shortlink!"
        );
        return res.data;
      }

      return new Error("error");
    })
    .catch((error) => {
      Notif.error(
        error?.data?.message || error?.message || "Internal server error"
      );

      return error;
    });

  return response;
}

export async function deleteShortlink(url: string) {
  const response = await redaxios
    .delete(url)
    .then((res) => {
      if (res.status === 200) {
        Notif.success(
          res.data.data?.message ||
            res.data.message ||
            "Shortlink successfully deleted"
        );

        return res.data;
      }

      return new Error("error");
    })
    .catch((error) => {
      Notif.error(
        error?.data?.message || error?.message || "Internal server error"
      );

      return error;
    });

  return response;
}
