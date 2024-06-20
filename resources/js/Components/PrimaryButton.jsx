export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-emerald-500  border border-transparent rounded-md font-semibold text-xs text-white  uppercase tracking-widest hover:bg-emerald-600 focus:bg-gray-200  active:bg-gray-900  focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2  transition ease-in-out duration-150 mb-4  ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
