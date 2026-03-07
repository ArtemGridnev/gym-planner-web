import { BottomNavigationAction, BottomNavigation as MUIBottomNavigation, type BottomNavigationProps as MUIBottomNavigationProps } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, type ElementType } from "react";

export type BottomNavigationItemProps = {
    path: string;
    label: string;
    icon: ElementType;
};

type BottomNavigationProps = Omit<MUIBottomNavigationProps, 'value'> &{
    items: BottomNavigationItemProps[]
};

export default function BottomNavigation({ items, ...props }: BottomNavigationProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const activeItemIndex = useMemo(() => {
        return items.findIndex(item => item.path === location.pathname);
    }, [location.pathname]);

    return (
        <MUIBottomNavigation
          showLabels
          value={activeItemIndex}
          {...props}
        >
            {items.map((item, index) => (
                 <BottomNavigationAction 
                    label={item.label} 
                    icon={<item.icon />} 
                    key={index} 
                    onClick={() => navigate(item.path)}
                 />
            ))}
        </MUIBottomNavigation>
    );
}