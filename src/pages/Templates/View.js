import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';

// Configs.
import { API } from '../../config/api';

// Components.
import TemplateA from './Views/TemplateA';
import TemplateB from './Views/TemplateB';

const View = () => {
  // Vars.
  const { link } = useParams();

  // States.
  const [content, setContent] = useState(null);

  // Queries.
  const getContent = async () => {
    try {
      const res = await API.get(`/content/view/${link}`);
      setContent(res.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContent();
  }, []);

  // Renders.
  const renderContent = () => {
    console.log(content);
    switch (content.templateId) {
      case 1:
        return (
          <Container>
            <TemplateA
              title={content.title}
              description={content.description}
              img={content.img}
              links={content.links}
            />
          </Container>
        );
      case 2:
        return (
          <TemplateB
            title={content.title}
            description={content.description}
            img={content.img}
            links={content.links}
          />
        );
      default:
        throw new Error();
    }
  };
  return <>{content ? <>{renderContent()}</> : null}</>;
};

export default View;
