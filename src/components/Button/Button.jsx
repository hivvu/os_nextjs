import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import './Button.scss';

const Button = ({
    label,
    icon,
    iconWidth,
    iconHeight,
    onClick,
    className,
    type = 'button',
    custom,
    inline,
    href,
    disabled,
    target,
    rel,
    reverse,
    line,
    block,
    center,
    ...rest
}) => {
    const buttonClass = classNames({
        'button': true,
        'button--icon': icon,
        'button--line': line,
        'button--block': block,
        'button--center': center,
        [className]: className,
        ['button--' + type]: type,
        'button--only-icon': icon && !label,
        'button--inline': inline,
        'button--disabled': disabled,
        'button--reverse': reverse,
    });

    const content = (
        <>
            {label && <span>{label}</span>}
            {icon && (
                <span className="button__icon">
                    <Image src={icon} alt={label} width={iconWidth} height={iconHeight} />
                </span>
            )}
            {custom}
        </>
    );

    return href ? (
        <Link
            href={href}
            scroll={false}
            className={buttonClass}
            onClick={onClick}
            target={target}
            rel={rel}
            {...rest}
        >
            {content}
        </Link>
    ) : (
        <button
            type={type}
            onClick={onClick}
            className={buttonClass}
            disabled={disabled}
            {...rest}
        >
            {content}
        </button>
    );
};

export default Button;


