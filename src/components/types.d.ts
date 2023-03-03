/* eslint-disable no-unused-vars */
interface LinkCardProps {
  _id: string;
  original_link: string;
  slug: string;
  is_secret: boolean;
  link_key: string;
  className?: string;
  onClickDelete?: () => void;
  modal?: {
    onClose?: () => void;
    onConfirm?: () => void;
    open?: boolean;
  };
}
