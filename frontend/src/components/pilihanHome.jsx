// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import {ButtonBase,Typography} from '@material-ui/core';
// import {Link} from 'react-router-dom'
// import Fade from "react-reveal";

// const images = [
//   {
//     id:1,
//     url: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2016%2F09%2Fnike-hyperadapt-1-0-official-release-date-1.jpg?q=75&w=800&cbr=1&fit=max',
//     title: 'Running',
//     width: '33.3%',
//   },
//   {
//     id:2,
//     url: 'https://www.sneakerhdwallpapers.com/wallpapers/2019/lebron-17-wallpaper-preview.jpg',
//     title: 'Basketball',
//     width: '33.3%',
//   },
//   {
//     id:3,
//     url: 'https://usatftw.files.wordpress.com/2014/04/su14_gfb_merc_hi_3qf_pnk_v3_29207.jpg?w=1000&h=600&crop=1',
//     title: 'Football',
//     width: '33.3%',
//   },
// ];

// export const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     minWidth: 300,
//     width: '100%',
//   },
//   image: {
//     position: 'relative',
//     height: 700,
//     [theme.breakpoints.down('xs')]: {
//       width: '100% !important', // Overrides inline-style
//       height: 100,
//     },
//     '&:hover, &$focusVisible': {
//       zIndex: 1,
//       '& $imageBackdrop': {
//         opacity: 0.15,
//       },
//       '& $imageMarked': {
//         opacity: 0,
//       },
//       '& $imageTitle': {
//         // border: '4px solid currentColor',
//       },
//     },
//   },
//   focusVisible: {},
//   imageButton: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     color: theme.palette.common.white,
//   },
//   imageSrc: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center 40%',
//   },
//   imageBackdrop: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundColor: theme.palette.common.black,
//     opacity: 0.4,
//     transition: theme.transitions.create('opacity'),
//   },
//   imageTitle: {
//     position: 'relative',
//     padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
//   },
//   imageMarked: {
//     height: 3,
//     width: 18,
//     backgroundColor: theme.palette.common.white,
//     position: 'absolute',
//     bottom: -2,
//     left: 'calc(50% - 9px)',
//     transition: theme.transitions.create('opacity'),
//   },
// }));

// export default function ButtonBases() {
//   const classes = useStyles();

//   return (
//     <Fade bottom>
//     <div className={classes.root} style={{boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} >
//       {images.map((image) => (

//         <ButtonBase
//         focusRipple
//         key={image.title}
//         className={classes.image}mt-3
//         focusVisibleClassName={classes.focusVisible}
//         style={{
//           width: image.width,
//           // marginTop:'20px',
//           // marginBottom:'20px'
//         }}
//         >
//           <Link to={"/catalogs"+ image.id} style={{textDecoration:'none',color:'white'}}>
//           <span
//             className={classes.imageSrc}
//             style={{
//               backgroundImage: `url(${image.url})`,
//             }}
//           />

//           <span className={classes.imageBackdrop} />
//           <span className={classes.imageButton}>
//             <Typography
//               component="span"
//               variant="subtitle1"
//               color="inherit"
//               className={classes.imageTitle}
//               style={{fontSize:'20px'}}
//             >

//                 {image.title}
//                 <span className={classes.imageMarked} />
//             </Typography>
//           </span>
//               </Link>
//         </ButtonBase>
//       ))}
//     </div>
//     </Fade>
//   );
// }
