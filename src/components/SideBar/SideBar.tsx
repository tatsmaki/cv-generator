import {
  StyledStack,
  StyledDiv,
  StyledNavLink,
  NavLinkTypography,
} from "./SideBar.styles";
import DnsIcon from "@mui/icons-material/Dns";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FolderIcon from "@mui/icons-material/Folder";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { ROUTE } from "../../route/route";
import { SideBarIcons } from "./SideBarIcons";

export const SideBar = () => {
  return (
    <StyledDiv>
      <StyledStack>
        <StyledNavLink to={ROUTE.EMPLOYEES}>
          {({ isActive }) => (
            <>
              <SideBarIcons.EmojiPeople isActive={isActive} />
              <NavLinkTypography isActive={isActive}>
                Employees
              </NavLinkTypography>
            </>
          )}
        </StyledNavLink>
      </StyledStack>
      <StyledStack>
        <StyledNavLink to={ROUTE.PROJECTS}>
          {({ isActive }) => (
            <>
              <SideBarIcons.Dns isActive={isActive} />
              <NavLinkTypography isActive={isActive}>
                Projects
              </NavLinkTypography>
            </>
          )}
        </StyledNavLink>
      </StyledStack>
      <StyledStack>
        <StyledNavLink to={ROUTE.CVS}>
          {({ isActive }) => (
            <>
              <SideBarIcons.AutoStories isActive={isActive} />
              <NavLinkTypography isActive={isActive}>Cvs</NavLinkTypography>
            </>
          )}
        </StyledNavLink>
      </StyledStack>
      <StyledStack>
        <StyledNavLink to={ROUTE.ENTITIES}>
          {({ isActive }) => (
            <>
              <SideBarIcons.FolderIcon isActive={isActive} />
              <NavLinkTypography isActive={isActive}>
                Entities
              </NavLinkTypography>
            </>
          )}
        </StyledNavLink>
      </StyledStack>
    </StyledDiv>
  );
};
