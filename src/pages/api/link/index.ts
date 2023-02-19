/* eslint-disable no-nested-ternary */
import { NextApiRequest, NextApiResponse } from "next";

import connectDB from "@/libs/db";
import { Link } from "@/models";
// import type { LinkSchemaType } from "@/models";
import { ApiError, SendResponse } from "@/utils";
import { randomBytes } from "crypto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method?.toUpperCase();

  if (method === "POST") {
    try {
      const { headers } = req;
      const { uid } = headers;

      await connectDB();

      const { url, slug, is_secret, key } = req.body;

      if (slug) {
        const check = await Link.findOne({ "link.slug": slug });

        if (check) {
          throw new ApiError(409, `'${slug}' already used`);
        }
      }

      const link = new Link({
        uid,
        link: {
          original_link: url,
          slug: slug || randomBytes(6).toString("base64url"),
          key
        },
        is_secret
      });
      const isSaved = await link.save();

      if (!isSaved) {
        throw new ApiError(500, "Please try again");
      }

      return SendResponse(res, {
        status: "ok",
        status_code: 201,
        message: "Success!",
        data: {
          uid,
          url: `${process.env.BASE_URL as string}/${isSaved.link.slug}`
        }
      });
    } catch (error: any) {
      if (error instanceof ApiError) {
        return SendResponse(res, {
          status: "error/failed",
          status_code: error.statusCode || 500,
          message: error.message || "Internal server error"
        });
      }

      return SendResponse(res, {
        status: "error/failed",
        status_code: 500,
        message: "Internal server error"
      });
    }
  }

  if (method === "GET") {
    try {
      await connectDB();

      const { uid } = req.headers;
      const { skip, max } = req.query;

      const limit = max
        ? !Number.isNaN(parseInt(max as string, 10))
          ? parseInt(max as string, 10)
          : 10
        : 10;
      const skipFrom = skip
        ? !Number.isNaN(parseInt(skip as string, 10))
          ? parseInt(skip as string, 10)
          : 0
        : 0;

      if (!uid) {
        throw new ApiError(400, "uid is required");
      }

      const links = await Link.find({
        uid
      })
        .limit(limit)
        .skip(skipFrom);

      return SendResponse(res, {
        status: "ok",
        status_code: 200,
        message: "success!",
        data: links.map(({ link, _id, is_secret }) => ({
          _id,
          slug: link.slug,
          origianl_link: link.original_link,
          is_secret,
          key: link.key
        })),
        length: links.length,
        query: {
          limit,
          skip: skipFrom
        }
      });
    } catch (error: any) {
      if (error instanceof ApiError) {
        return SendResponse(res, {
          status: "error/failed",
          status_code: error.statusCode || 500,
          message: error.message || "Internal server error"
        });
      }

      return SendResponse(res, {
        status: "error/failed",
        status_code: 500,
        message: "Internal server error"
      });
    }
  }

  return SendResponse(res, {
    status: "error/failed",
    status_code: 404,
    message: "Endpoint not found"
  });
}
