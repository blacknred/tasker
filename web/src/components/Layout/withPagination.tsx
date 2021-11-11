import React, { ComponentType, useState } from "react";
import { Stack, Button, VisuallyHidden } from '@chakra-ui/react';

function withPagination<T>(Paginated: ComponentType<T>) {
  return function (props: T) {
    const [noMore, setNoMore] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);

    return (
      <>
        <Paginated {...props} page={pageIndex} />
        <VisuallyHidden><Paginated {...props} page={pageIndex + 1} /></VisuallyHidden>
        <Stack isInline spacing="5" mx="-5" mt="10" >
          <Button
            onClick={() => setPageIndex(pageIndex - 1)}
            hidden={!pageIndex}
            colorScheme="blackAlpha">
            Previous
          </Button>
          <Button
            onClick={() => setPageIndex(pageIndex + 1)}
            variant="solid"
            hidden={noMore}
            colorScheme="blackAlpha">
            Next
          </Button>
        </Stack>
      </>
    )
  };
}

export default withPagination;
