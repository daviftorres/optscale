import { Autocomplete, Box, Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import DynamicFractionDigitsValue from "components/DynamicFractionDigitsValue";
import Input from "components/Input";
import LeaderboardDatasetDetails from "components/LeaderboardDatasetDetails";
import SlicedText from "components/SlicedText";
import { useIsAllowed } from "hooks/useAllowedActions";
import { isEmpty as isEmptyArray } from "utils/arrays";
import AddLeaderboardCriteriaIconButton from "./AddLeaderboardCriteriaIconButton";
import CopyLeaderboardDatasetIconButton from "./CopyLeaderboardDatasetIconButton";
import DeleteLeaderboardDatasetButton from "./DeleteLeaderboardDatasetButton";
import EditLeaderboardDatasetIconButton from "./EditLeaderboardDatasetIconButton";

const NoLeaderboards = ({ leaderboard, task, onCreateLeaderboardDataset }) => {
  const isAddLeaderboardCriteriaAllowed = useIsAllowed({ requiredActions: ["EDIT_PARTNER"] });

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography>
        <FormattedMessage id="noLeaderboards" />
      </Typography>
      {isAddLeaderboardCriteriaAllowed && (
        <AddLeaderboardCriteriaIconButton leaderboard={leaderboard} task={task} onSuccess={onCreateLeaderboardDataset} />
      )}
    </Box>
  );
};

const LeaderboardDatasetsListSection = ({
  task,
  leaderboard,
  leaderboardDatasets,
  leaderboardDataset,
  selectedLeaderboardDatasetId,
  onSelectedLeaderboardDatasetIdChange,
  onCreateLeaderboardDataset,
  onUpdateLeaderboardDataset
}) => {
  const isAddLeaderboardCriteriaAllowed = useIsAllowed({ requiredActions: ["EDIT_PARTNER"] });

  return (
    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
      <Autocomplete
        options={leaderboardDatasets}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option?.name ?? ""}
        value={leaderboardDatasets.find(({ id }) => id === selectedLeaderboardDatasetId) ?? ""}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(event, newValue) => {
          onSelectedLeaderboardDatasetIdChange(newValue.id);
        }}
        sx={{
          maxWidth: "450px",
          flexBasis: "280px",
          flexGrow: 1
        }}
        renderOption={(props, option) => {
          const { name, primary_metric: { name: primaryMetricName, value: primaryMetricValue } = {} } = option;

          return (
            <li {...props}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body2">
                  <SlicedText text={name} limit={25} />
                </Typography>
                <Typography variant="caption">
                  <SlicedText text={primaryMetricName} limit={15} />
                  &#58;&nbsp;
                  <strong>
                    {primaryMetricValue === null ? "-" : <DynamicFractionDigitsValue value={primaryMetricValue} />}
                  </strong>
                </Typography>
              </Box>
            </li>
          );
        }}
        renderInput={(autoCompleteParams) => <Input label={<FormattedMessage id="leaderboard" />} {...autoCompleteParams} />}
      />
      {isAddLeaderboardCriteriaAllowed && (
        <Box>
          <AddLeaderboardCriteriaIconButton leaderboard={leaderboard} task={task} onSuccess={onCreateLeaderboardDataset} />
          <EditLeaderboardDatasetIconButton
            task={task}
            leaderboardDataset={leaderboardDataset}
            onSuccess={onUpdateLeaderboardDataset}
          />
          <CopyLeaderboardDatasetIconButton
            task={task}
            leaderboard={leaderboard}
            leaderboardDataset={leaderboardDataset}
            onSuccess={onCreateLeaderboardDataset}
          />
          <DeleteLeaderboardDatasetButton leaderboardDataset={leaderboardDataset} />
        </Box>
      )}
    </Box>
  );
};

const LeaderboardDatasets = ({
  task,
  leaderboard,
  leaderboardDatasets = [],
  leaderboardDataset,
  selectedLeaderboardDatasetId,
  leaderboardDatasetDetails,
  onSelectedLeaderboardDatasetIdChange,
  onCreateLeaderboardDataset,
  onUpdateLeaderboardDataset,
  isLoadingProps = {}
}) => (
  <Box>
    {isEmptyArray(leaderboardDatasets) ? (
      <NoLeaderboards leaderboard={leaderboard} task={task} onCreateLeaderboardDataset={onCreateLeaderboardDataset} />
    ) : (
      <Stack spacing={1}>
        <div>
          <LeaderboardDatasetsListSection
            task={task}
            leaderboard={leaderboard}
            leaderboardDatasets={leaderboardDatasets}
            leaderboardDataset={leaderboardDataset}
            selectedLeaderboardDatasetId={selectedLeaderboardDatasetId}
            onSelectedLeaderboardDatasetIdChange={onSelectedLeaderboardDatasetIdChange}
            onCreateLeaderboardDataset={onCreateLeaderboardDataset}
            onUpdateLeaderboardDataset={onUpdateLeaderboardDataset}
          />
        </div>
        <div>
          <LeaderboardDatasetDetails
            leaderboardDataset={leaderboardDataset}
            leaderboardDatasetDetails={leaderboardDatasetDetails}
            isLoadingProps={{
              isGetLeaderboardDatasetLoading: isLoadingProps.isGetLeaderboardDatasetLoading,
              isGetLeaderboardDatasetDetailsLoading: isLoadingProps.isGetLeaderboardDatasetDetailsLoading
            }}
          />
        </div>
      </Stack>
    )}
  </Box>
);

export default LeaderboardDatasets;
