import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalParent = props => {
  const { className, toggle, modal, title, actionfunc, btnTitle } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        {/* <ModalHeader toggle={toggle}>{title}</ModalHeader> */}
        <ModalBody>{props.children}</ModalBody>
        {/* <ModalFooter>
        </ModalFooter> */}
      </Modal>
    </div>
  );
};

export default ModalParent;
