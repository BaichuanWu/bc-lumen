import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import Form from "../form";
import type { FormItem } from "src/types";

interface CUDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: T) => void;
  item: T;
  formItems: FormItem[];
  title: string;
}

export default function CUDialog<T>({
  open,
  onClose,
  onSubmit,
  item,
  formItems,
  title,
}: CUDialogProps<T>) {
  const [currentItem, setCurrentItem] = useState<T>(item);
  const ref = useRef<any>(null);
  useEffect(() => {
    setCurrentItem(item);
  }, [item, open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Form ref={ref} onSubmit={onSubmit} defaultValues={currentItem} items={formItems} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{"cancel"}</Button>
        <Button onClick={() => ref.current?.submit()} variant="contained">
          {"save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
