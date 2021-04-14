import React, { useState, useEffect } from 'react';

// Components.
import DashboardHeader from '../components/Headers/DashboardHeader';
import SearchBar from '../components/Forms/SearchBar';
import LinkList from '../components/List/LinkList';

// Configs.
import { API } from '../config/api';

// Styles.
import styles from '../styles/Pages/MyLink.module.scss';
import SimpleButton from '../components/Buttons/SimpleButton';

const MyLink = () => {
  // Vars.
  const LIMIT = 5;

  // States.
  const [form, setForm] = useState({
    search: '',
  });
  const [count, setCount] = useState(0);
  const [contents, setContents] = useState([]);
  const [selectiveContents, setSelectiveContents] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(true);

  // Queries.
  const getContents = async () => {
    try {
      const res = await API.get(`/contents?limit=${LIMIT}&page=${page}`);
      const { data } = res.data;

      if (contents.length + data.contents.rows.length >= data.contents.count) {
        setIsLoadMore(false);
      }

      setContents([...contents, ...data.contents.rows]);
      setSelectiveContents([...contents, ...data.contents.rows]);
      setCount(data.contents.count);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContents();
  }, []);

  // Handlers.
  const handleDeleteContent = async (id) => {
    try {
      await API.delete(`/content/${id}`);
      getContents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadMore = () => {
    getContents();
  };

  const handleSearch = () => {
    const result = contents.filter((content) =>
      content.title.toLowerCase().startsWith(form.search.toLowerCase())
    );
    setSelectiveContents(result);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Render.
  const renderLinks = () =>
    selectiveContents.map(({ title, views, uniqueLink, id, img }) => (
      <LinkList
        key={id}
        id={id}
        title={title}
        views={views}
        link={uniqueLink}
        className={styles.link}
        img={img}
        onDelete={() => handleDeleteContent(id)}
      />
    ));
  return (
    <>
      <DashboardHeader title="My Links" />
      <div className="dashboard-container">
        <div className={styles.container}>
          <div className={styles.head}>
            <div className={styles.title}>
              All links
              {count > 0 && <span>{count}</span>}
            </div>
            <SearchBar
              className={styles.search}
              placeholder="Find your link."
              name="search"
              value={form.search}
              onChange={handleChange}
              onSearch={handleSearch}
            />
          </div>
          <div>{renderLinks()}</div>
          {isLoadMore && (
            <SimpleButton title="Load More" onClick={handleLoadMore} />
          )}
        </div>
      </div>
    </>
  );
};

export default MyLink;
