import Switch from "@mui/material/Switch";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { updateWebhook } from "api";
import Tooltip from "components/Tooltip";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";

const EditEnvironmentWebhookActivityContainer = ({ webhookId, isActive = false }) => {
  const dispatch = useDispatch();

  const { isDemo } = useOrganizationInfo();

  const toggle = (newIsActive) => dispatch(updateWebhook(webhookId, { active: newIsActive }));

  return isDemo ? (
    <Tooltip title={<FormattedMessage id="notAvailableInLiveDemo" />}>
      <span>
        <Switch checked={isActive} disabled />
      </span>
    </Tooltip>
  ) : (
    <Switch checked={isActive} onClick={(e) => toggle(e.target.checked)} />
  );
};

export default EditEnvironmentWebhookActivityContainer;
