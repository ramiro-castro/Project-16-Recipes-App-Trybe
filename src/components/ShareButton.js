import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Share from '../images/Share.svg';

const copy = require('clipboard-copy');

function ShareButton({ testId, recipe }) {
  const history = useHistory();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (testId.includes('horizontal')) {
      copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    } else {
      copy(`http://localhost:3000${history.location.pathname}`);
    }
    setCopied(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleShare }
      >
        <img data-testid={ testId } src={ Share } alt="Share.svg" />
      </button>
      {copied
      && <p>Link copied!</p>}
    </div>
  );
}

ShareButton.propTypes = {}.isRequired;

export default ShareButton;
