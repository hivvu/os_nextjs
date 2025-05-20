// Styles
// import './ContentWithSidebar.scss';

// Utils
import classNames from 'classnames';


const ContentWithSidebar = ({ children, sidebar, sidebarPosition, className }) => {

    const contentWithSidebarClass = classNames(
        "content-with-sidebar",
        className && className
    );

    const sidebarClass= classNames({
        "content-with-sidebar__container__sidebar": true,
        "content-with-sidebar__container__sidebar--left": !sidebarPosition || sidebarPosition === 'left',
        "content-with-sidebar__container__sidebar--right": sidebarPosition && sidebarPosition === 'right',
    });

    return (
        <div className={contentWithSidebarClass}>
            <div className="content-with-sidebar__container">
                <div className={sidebarClass}>
                    {sidebar}
                </div>

                <div className="content-with-sidebar__container__content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ContentWithSidebar;
