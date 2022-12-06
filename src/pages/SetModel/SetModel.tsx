import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";

import ModelDatesForm, { ModelDates } from "components/forms/modeldatesform";
import { RouteProps, RouteValue } from "../../Router";
import { DataActionType } from "reducers/DataReducer";
import {isoToDateObj} from "../../utils/dates";
import {ModelStats} from "../../components/forms/modeldatesform/ModelDatesForm";
import RootLayout, {PageProps} from "../../t2/layouts/root";
import { Loader } from "@sfdl/sf-mui-components";

interface SetModelProps extends RouteProps {
  handleRouteChange: (route: RouteValue) => void;
}

const SetModel = (props: SetModelProps) => {
  const { api, dispatch, data } = props;
  const [ loading, setLoading ] = useState(false);
  const [ page, setPage ] = useState(null as PageProps | null);

  useEffect(() => {
    const submit = async () => {
      setLoading(true);
      const pageResult = await api.callAPI({method: "prepare", value: {}})
      setPage(pageResult as PageProps);
      setLoading(false);
    }
    if (!page && !loading) {
      submit();
    }
  }, [api, page, loading]);

  const onSubmit = async (action: string, state: any) => {
    if (props.api) {
      const result = await props.api.callAPI({method: action, value: state});
      console.log("Received result", result);
      setPage(result);
    }
  }

  if (loading) {
    return <Loader type="cover" />
  } else if (page) {
    return <RootLayout {...page} onSubmit={onSubmit} />
  } else {
    return <p>Something may have gone wrong...</p>
  }

  // return (
  //   <>
  //     <Box flexGrow={1}>
  //     </Box>
  //   </>
  // );
};

export default SetModel;
