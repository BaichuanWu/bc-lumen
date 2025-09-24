import { createTheme } from "@mui/material/styles";

import {
  type NavigationItem as MuiItem,
} from "@toolpad/core/AppProvider";

import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { type Branding } from "@toolpad/core/AppProvider";
import { Routes, Route } from "react-router";
import { useMemo } from "react";


export type NavigationItem = {
  kind?: "header" | "divider";
  segment?: string;
  path?: string;
  title?: string;
  icon?: React.ReactNode;
  component?: React.ReactNode;
  children?: NavigationItem[];
};

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
})

const generateRouteItems = (items: NavigationItem[], prefix=""): {path:string, element: React.ReactNode}[] => {
  const rs: {path:string, element: React.ReactNode}[] = []
  items.forEach((item) => {
    if (item.segment) {
      const path = prefix ? `${prefix}/${item.segment}` : item.segment;
      if (item.component) {
        rs.push({path, element: item.component})
      }
      if (item.children && item.children.length > 0) {
        rs.push(...generateRouteItems(item.children, path))
      }
    }
  })
  return rs
}

const DashboardPage=({ branding,  items, linkPrefix=""}: { branding: Branding, items: NavigationItem[], linkPrefix?: string }) => {
  const navifation = useMemo(() => {
    if (linkPrefix) {
      return items.map((item) => {
        if (item.segment) {
          return {
            ...item,
            segment: `${linkPrefix}/${item.segment}`, 
          };
        }
        return item;
      });
    }
    return items;
  }, [items, linkPrefix]);
  const routeItems = useMemo(() => generateRouteItems(items), [items])

  return (
    <ReactRouterAppProvider navigation={navifation as MuiItem[]} theme={demoTheme}>
      <DashboardLayout branding={branding}>
        <Routes>
          {routeItems.map(({path, element}) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}

export default DashboardPage;
