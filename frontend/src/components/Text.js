import clsx from "clsx";

const Text = ({ StartIcon, EndIcon, value = "", startClassName = "", endClassName = "" }) => {
    return (
        <>
            {StartIcon ? <StartIcon className={clsx("mr-3.5 min-w-fit", startClassName)} /> : null}
            {value}
            {EndIcon ? <EndIcon className={clsx(" min-w-fit", endClassName)} /> : null}
        </>
    );
};

export default Text;
