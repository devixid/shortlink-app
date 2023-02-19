import { createHmac, randomUUID } from "crypto";
import mongoose from "mongoose";

export interface LinkSchemaType {
  _id: string;
  uid: string;
  link: {
    original_link: string;
    slug: string;
    key: string | null;
  };
  is_secret: boolean;
  secret_key: string | null;
  clicked: number;
  created_at: string;
}

const linkSchema = new mongoose.Schema<LinkSchemaType>(
  {
    _id: {
      type: String,
      required: false,
      default: () => randomUUID()
    },
    uid: {
      type: String,
      required: true
    },
    link: {
      original_link: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true
      },
      key: {
        type: String,
        required: false,
        default: () => null
      }
    },
    is_secret: {
      type: Boolean,
      default: () => false
    },
    secret_key: {
      type: String,
      required: false,
      default: () => null
    },
    created_at: {
      type: String,
      default: () => new Date(Date.now()).toISOString()
    }
  },
  {
    versionKey: false
  }
);

// eslint-disable-next-line func-names
linkSchema.pre("save", function () {
  const { is_secret, link } = this;
  const {
    key
    // original_link
  } = link;

  if (is_secret && key) {
    // const encryptedLink =
    const secretKey = createHmac(
      "sha512",
      process.env.SECRET_KEY || "secret_key"
    )
      .update(key)
      .digest("hex");

    this.secret_key = secretKey;
  }
});

export default mongoose.models.Link ||
  mongoose.model<LinkSchemaType>("Link", linkSchema);
