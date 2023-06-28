import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";

import Editor from "../../editor";
import { PadHeader } from "../../components";

function fetcher(route: string) {
  // return Promise.resolve(mockData);
  return fetch(route)
    .then((r) => r.ok && r.json())
    .then((data) => data || null);
}

const PadContainer = styled.section`
  display: grid;
  grid-template-rows: 20vh 80vh;
`;

const usePad = (initial) => {
  const [pad, setPad] = useState(initial);

  useEffect(() => {
    setPad(initial);
  }, [initial]);

  const updatePad = (json) => {
    setPad({
      ...pad,
      doc: json,
    });
  };
  return [pad, updatePad];
};

const Pad = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data, error, mutate } = useSWR(`/api/pad/${slug}`, fetcher);
  const [pad, setPad] = usePad(data);
  const loading = !pad;

  if (loading) return <>Loading...</>;

  return (
    <PadContainer>
      <PadHeader pad={pad} />
      <Editor pad={pad} updatePad={setPad} />
    </PadContainer>
  );
};

export default Pad;
