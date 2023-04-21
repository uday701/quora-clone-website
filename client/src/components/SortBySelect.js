import { FormControl, MenuItem, Select, Typography,Stack } from "@mui/material";
import React, { useState } from "react";
import { BiNoEntry } from "react-icons/bi";


const SortBySelect = ({ onSortBy, sortBy, sorts }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Typography color="text.secondary" variant="subtitle2">
        Sort by:
      </Typography>
      <Select
        size="small"
        value={sorts[sortBy]}
        sx={{ minWidth: 150 }}
        onChange={onSortBy}
      >
        {Object.keys(sorts).map((sortName, i) => (
          <MenuItem value={sorts[sortName]} key={i}>
            {sorts[sortName]}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default SortBySelect;
