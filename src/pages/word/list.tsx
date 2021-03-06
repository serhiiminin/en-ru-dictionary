import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import styled from 'styled-components';
import { LoadingContext } from '../../context/loading';
import { WordsContext } from '../../context/words';
import LN from '../../constants/loading-names';
import { TitleBlock, InputWithSearch, WordListItem, WordList, Container, Select, ButtonLink } from '../../components';
import { SearchParamsContext } from '../../context/search-params';
import routes from '../../routes';

const SELECT_CONFIG = [{ value: 'created', title: 'most recent' }, { value: 'word', title: 'alphabet' }];

const WrapperTools = styled.div`
  padding: 20px 0;
  box-shadow: 6px 6px 40px rgba(123, 123, 123, 0.1);
`;

const WordsList = (): JSX.Element => {
  const { searchParams, setNewSearchParams } = useContext(SearchParamsContext);
  const { checkIsLoading } = useContext(LoadingContext);
  const { wordsList, handleDeleteWord, handleFetchWordsList, cleanWordsList } = useContext(WordsContext);
  const isLoading = checkIsLoading(LN.words.list);

  useEffect((): (() => void) => {
    handleFetchWordsList();

    return cleanWordsList;
  }, [Object.values(searchParams).toString()]);

  const handleSetNewParams = (paramName: string): ((v: string) => void) => (value: string): void => {
    setNewSearchParams(routes.words.list, { [paramName]: value });
  };

  return (
    <>
      <WrapperTools>
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <InputWithSearch
                variant="outlined"
                label="search"
                urlValue={searchParams.filter || ''}
                onEnterPress={handleSetNewParams('filter')}
              />
            </Grid>
            <Grid item xs={2}>
              <ButtonLink to={routes.words.add}>
                <Add />
                add word
              </ButtonLink>
            </Grid>
            <Grid item xs={2}>
              <Select urlValue={searchParams.sortBy} items={SELECT_CONFIG} onChange={handleSetNewParams('sortBy')} />
            </Grid>
            <Grid item xs={4}>
              <TitleBlock textAlign="right">Your words</TitleBlock>
            </Grid>
          </Grid>
        </Container>
      </WrapperTools>
      <WordList>
        {isLoading
          ? Array(searchParams.countPerPage)
              .fill(null)
              .map(
                (): JSX.Element => (
                  <WordListItem
                    key={Math.random()}
                    word={{ _id: '', created: '', updated: '' }}
                    onDelete={handleDeleteWord}
                    filter={searchParams.filter}
                    isLoading={isLoading}
                  />
                )
              )
          : wordsList.map(
              (word): JSX.Element => (
                <WordListItem
                  key={word._id}
                  word={word}
                  onDelete={handleDeleteWord}
                  filter={searchParams.filter}
                  isLoading={isLoading}
                />
              )
            )}
      </WordList>
    </>
  );
};

export default WordsList;
