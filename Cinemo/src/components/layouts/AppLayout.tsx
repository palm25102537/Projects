import { FC, PropsWithChildren } from "react";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

interface Props extends PropsWithChildren {
  showSideBar?: boolean;
}

export const AppLayout: FC<Props> = ({ children, showSideBar }) => {
  return (
    <div className="flex flex-col h-app">
      <AppHeader />
      {showSideBar ? (
        <div className="mt-[56px] flex-1 bg-[#101418] flex">
          <AppSidebar />
          <div
            className="flex-1 p-5 text-[#f5f5f1]"
            style={{ width: "calc(100% - 240px)" }}
          >
            {children}
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};
