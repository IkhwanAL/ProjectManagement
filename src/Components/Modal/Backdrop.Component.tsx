import classes from "../../Styles/Style.module.scss";

const Backdrop = (props: any) =>
	props.show ? (
		<div className={`w-full h-full top-0 left-0 fixed ${classes.darkBG}`}>
			{props.children}
		</div>
	) : (
		<></>
	);

export default Backdrop;
