// import React, { useState } from "react";
// import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
// import Header from "./../components/header";
// import { useDispatch } from "react-redux";
// import { onUserRegister } from "./../redux/Actions";

// const FormPage = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isModal, setModalOpen] = useState(false);
//   const [dataUser, setDataUser] = useState({
//     username: "",
//     password: "",
//     email: ""
//   });

//   const togglemodal = () => setModalOpen(!isModal);
//   const toggle = () => setIsOpen(!isOpen);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <Header />
//       <MDBContainer style={{ marginTop: "100px", marginLeft: "690px" }}>
//         <MDBRow>
//           <MDBCol md="6">
//             <MDBCard>
//               <MDBCardBody>
//                 <form>
//                   <p className="h4 text-center py-4">Sign up</p>
//                   <div className="grey-text">
//                     <MDBInput label="Your name" icon="user" group type="text" validate error="wrong" success="right" />
//                     <MDBInput label="Your email" icon="envelope" group type="email" validate error="wrong" success="right" />
//                     <MDBInput label="Confirm your email" icon="exclamation-triangle" group type="text" validate error="wrong" success="right" />
//                     <MDBInput label="Your password" icon="lock" group type="password" validate />
//                   </div>
//                   <div className="text-center py-4 mt-3">
//                     <MDBBtn color="cyan" type="button" onClick={() => dispatch(onUserRegister("dzakyinsan", "dzakyinsan20@gmail.com", "123"))}>
//                       Register
//                     </MDBBtn>
//                   </div>
//                 </form>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBContainer>
//     </div>
//   );
// };

// export default FormPage;
