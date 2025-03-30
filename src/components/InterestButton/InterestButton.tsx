type InterestButtonProps = {
    isInterestSelected?: boolean,
    children: string,
    onClick?: () => void;
}

export function InterestButton({ children, isInterestSelected, ...props }: InterestButtonProps) {


    let className = 'border-2 border-royalblue py-1 px-2 mx-2 my-2 rounded-xl box-shadow';

    if (isInterestSelected != undefined) {
        if (!isInterestSelected) {
            className = 'border-2 border-royalblue py-1 px-2 mx-2 my-2 rounded-xl box-shadow'
        }
        else {
            className = className + 'border-2 border-amber-600 bg-amber-500/10 py-1 px-2 mx-2 my-2 rounded-xl box-shadow scale-95'
        }
    }

    return (

        <button type="button" {...props} className={className}>{children}</button>

    )

}