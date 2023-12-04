import React, { Fragment, useState } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ModalClose,
  ModalDialog,
} from "@mui/joy";
import { VscWarning } from "react-icons/vsc";
import { FaTrashAlt } from "react-icons/fa";

const PopupModal = ({
  action,
  statusReturn,
  setStatusReturn,
  open,
  onClose,
}) => {
  const setupData = async (status) => {
    if (status === true) setStatusReturn(true);
    else setStatusReturn(false);
    open = false;
    onClose();
  };

  if (action === "success") {
    return (
      <Fragment>
        <Modal open={open} onClose={onClose}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            style={{ height: "28vh", width: "30vw" }}
          >
            <ModalClose />
            <DialogTitle style={{ fontSize: "20px" }}>Thành công</DialogTitle>
            <Divider />
            <DialogContent sx={{ fontSize: "18px" }}>
              Bạn đã thêm thành công
            </DialogContent>
          </ModalDialog>
        </Modal>
      </Fragment>
    );
  }

  if (action === "remove success") {
    return (
      <Fragment>
        <Modal open={open} onClose={onClose}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            style={{ height: "28vh", width: "30vw" }}
          >
            <ModalClose />
            <DialogTitle style={{ fontSize: "20px" }}>Thành công</DialogTitle>
            <Divider />
            <DialogContent sx={{ fontSize: "18px" }}>
              Bạn đã xóa thành công
            </DialogContent>
          </ModalDialog>
        </Modal>
      </Fragment>
    );
  }

  if (action === "filled") {
    return (
      <Fragment>
        <Modal open={open} onClose={onClose}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            style={{ height: "28vh", width: "30vw" }}
          >
            <ModalClose />
            <DialogTitle style={{ fontSize: "20px" }}>
              Thiếu thông tin
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ fontSize: "18px" }}>
              Hãy nhập đầy đủ thông tin
            </DialogContent>
          </ModalDialog>
        </Modal>
      </Fragment>
    );
  }

  if (action === "failed") {
    return (
      <Fragment>
        <Modal open={open} onClose={onClose}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            style={{ height: "28vh", width: "30vw" }}
          >
            <ModalClose />
            <DialogTitle style={{ fontSize: "20px" }}>Thất bại</DialogTitle>
            <Divider />
            <DialogContent sx={{ fontSize: "18px" }}>
              Thêm thất bại, hãy kiểm tra thông tin
            </DialogContent>
          </ModalDialog>
        </Modal>
      </Fragment>
    );
  }

  if (action === "update success") {
    return (
      <Fragment>
        <Modal open={open} onClose={onClose}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            style={{ height: "28vh", width: "30vw" }}
          >
            <ModalClose />
            <DialogTitle style={{ fontSize: "20px" }}>Thành công</DialogTitle>
            <Divider />
            <DialogContent sx={{ fontSize: "18px" }}>
              Bạn đã chỉnh sửa thành công
            </DialogContent>
          </ModalDialog>
        </Modal>
      </Fragment>
    );
  }

  if (action === "update") {
    return (
      <Fragment>
        <Modal open={open} onClose={onClose}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            style={{ height: "28vh", width: "30vw" }}
          >
            <DialogTitle style={{ fontSize: "20px" }}>
              Xác nhận chỉnh sửa
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ fontSize: "18px" }}>
              Bạn có chắc chắn muốn chỉnh sửa không?
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="primary"
                onClick={() => setupData(true)}
                style={{ fontSize: "20px" }}
              >
                Chỉnh sửa
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setupData(false)}
                style={{ fontSize: "20px" }}
              >
                Không
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </Fragment>
    );
  }

  if (action === "payment") {
    return (
      <Fragment>
        <Modal open={open} onClose={onClose}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            style={{ height: "28vh", width: "30vw" }}
          >
            <DialogTitle style={{ fontSize: "20px" }}>
              Xác nhận thanh toán
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ fontSize: "18px" }}>
              Bạn có chắc chắn muốn thanh toán không?
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="primary"
                onClick={() => setupData(true)}
                style={{ fontSize: "20px" }}
              >
                Thanh toán
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setupData(false)}
                style={{ fontSize: "20px" }}
              >
                Không
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </Fragment>
    );
  }

  if (action === "remove") {
    return (
      <Fragment>
        <Modal open={open} onClose={() => (open = false)}>
          <ModalDialog
            variant="outlined"
            role="alertdialog"
            style={{ height: "28vh", width: "30vw" }}
          >
            <DialogTitle style={{ fontSize: "20px" }}>
              <VscWarning
                style={{ paddingTop: "3px", height: "20px", width: "20px" }}
              />{" "}
              Xác nhận
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ fontSize: "18px" }}>
              Bạn có chắc chắn xóa không?
            </DialogContent>
            <DialogActions>
              <Button
                variant="solid"
                color="danger"
                onClick={() => setupData(true)}
                style={{ fontSize: "20px" }}
              >
                Xóa bỏ
              </Button>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setupData(false)}
                style={{ fontSize: "20px" }}
              >
                Không
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </Fragment>
    );
  }

  return (
    // <Fragment>
    //   <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
    //     Open modal
    //   </Button>
    //   <Modal
    //     aria-labelledby="modal-title"
    //     aria-describedby="modal-desc"
    //     open={open}
    //     onClose={() => setOpen(false)}
    //     sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    //   >
    //     <Sheet
    //       variant="outlined"
    //       sx={{
    //         maxWidth: 500,
    //         borderRadius: 'md',
    //         p: 3,
    //         boxShadow: 'lg',
    //       }}
    //     >
    //       <ModalClose variant="plain" sx={{ m: 1 }} />
    //       <Typography
    //         component="h2"
    //         id="modal-title"
    //         level="h4"
    //         textColor="inherit"
    //         fontWeight="lg"
    //         mb={1}
    //       >
    //         This is the modal title
    //       </Typography>
    //       <Typography id="modal-desc" textColor="text.tertiary">
    //         Make sure to use <code>aria-labelledby</code> on the modal dialog with an
    //         optional <code>aria-describedby</code> attribute.
    //       </Typography>
    //     </Sheet>
    //   </Modal>
    // </Fragment>

    <Fragment>
      <Modal open={open} onClose={() => (open = false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          style={{ height: "28vh", width: "30vw" }}
        >
          <DialogTitle style={{ fontSize: "20px" }}>
            <VscWarning
              style={{ paddingTop: "3px", height: "20px", width: "20px" }}
            />{" "}
            Xác nhận
          </DialogTitle>
          <Divider />
          <DialogContent sx={{ fontSize: "18px" }}>
            Bạn có chắc chắn xóa không?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => setupData(true)}
              style={{ fontSize: "20px" }}
            >
              Xóa bỏ
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setupData(false)}
              style={{ fontSize: "20px" }}
            >
              Không
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Fragment>
  );
};

export default PopupModal;
