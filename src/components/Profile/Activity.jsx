import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FeedTileTXS,
  FeedTileToken,
  FeedTileInternal,
  FeedTileActivity,
} from '../FeedTile';

import networkArray from '../../utils/networkArray';
import Loading from '../../assets/Loading.svg';
import '../styles/Feed.css';
import '../../views/styles/Profile.css';
import '../styles/NetworkArray.css';

const Activity = ({
  ifFetchingActivity,
  feedByAddress,
  verifiedGithub,
  verifiedTwitter,
  publicProfileActivity,
  onPublicProfilePage,
  currentAddress,
}) => (
    <div id="feed">
      <div>
        <p className="header" id="feed__header">Activity</p>
        <div className="feed__activity__address">
          {(ifFetchingActivity && !onPublicProfilePage)
            && (
              <div className="feed__activity__load">
                <img src={Loading} alt="loading" id="activityLoad" />
              </div>
            )
          }
          {(!onPublicProfilePage && feedByAddress.length > 0)
            ? feedByAddress.map((feedAddress, i) => (
              <div key={i} className="feed__activity__tile">
                <div className="feed__activity__context">
                  {Object.keys(feedAddress)[0] === 'threeBox' ? (
                    <div className="logo__icon feed__activity__context__network">
                      <h2>3</h2>
                    </div>
                  )
                    : (
                      <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
                        0x
                      </div>)
                  }
                  <div className="feed__activity__address">
                    {Object.keys(feedAddress)[0] === 'threeBox'
                      ? (
                        <div>
                          <h4>
                            3Box
                          </h4>
                          <p>
                            Activity
                          </p>
                        </div>
                      )
                      : (
                        <div>
                          <h4>
                            {Object.keys(feedAddress)[0]}
                          </h4>
                          <p>
                            Ethereum Address
                          </p>
                        </div>
                      )}
                  </div>
                </div>
                {
                  Object.values(feedAddress)[0].map((item, index) => (
                    (() => {
                      if (item.dataType === 'Internal') return <FeedTileInternal item={item} key={index} currentAddress={currentAddress} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Token') return <FeedTileToken item={item} key={index} currentAddress={currentAddress} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Txs') return <FeedTileTXS item={item} key={index} currentAddress={currentAddress} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Public') return <FeedTileActivity item={item} key={index} verifiedGithub={verifiedGithub} verifiedTwitter={verifiedTwitter} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Private') return <FeedTileActivity item={item} key={index} isEven={parseInt(index, 10) % 2 === 0} />;
                    })()
                  ))
                }
              </div>
            ))
            : (!ifFetchingActivity && !publicProfileActivity.length)
            && (
              <div className="feed__activity__load">
                <p>No activity at this address yet</p>
              </div>
            )
          }

          {(onPublicProfilePage && publicProfileActivity.length > 0)
            ? publicProfileActivity.map((feedAddress, i) => (
              <div key={i} className="feed__activity__tile">
                <div className="feed__activity__context">
                  {Object.keys(feedAddress)[0] === 'threeBox' ? (
                    <div className="logo__icon feed__activity__context__network">
                      <h2>3</h2>
                    </div>
                  )
                    : (
                      <div className={`feed__activity__context__network ${networkArray[Math.floor(Math.random() * networkArray.length)]}`}>
                        0x
                  </div>)
                  }
                  <div className="feed__activity__address">
                    {Object.keys(feedAddress)[0] === 'threeBox'
                      ? (
                        <div>
                          <h4>
                            3Box
                      </h4>
                          <p>
                            Activity
                      </p>
                        </div>
                      )
                      : (
                        <div>
                          <h4>
                            {Object.keys(feedAddress)[0]}
                          </h4>
                          <p>
                            Ethereum Address
                      </p>
                        </div>
                      )}
                  </div>
                </div>
                {
                  Object.values(feedAddress)[0].map((item, index) => (
                    (() => {
                      if (item.dataType === 'Internal') return <FeedTileInternal item={item} key={index} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Token') return <FeedTileToken item={item} key={index} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Txs') return <FeedTileTXS item={item} key={index} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Public') return <FeedTileActivity item={item} key={index} verifiedGithub={verifiedGithub} isEven={parseInt(index, 10) % 2 === 0} />;
                      if (item.dataType === 'Private') return <FeedTileActivity item={item} key={index} isEven={parseInt(index, 10) % 2 === 0} />;
                    })()
                  ))
                }
              </div>
            ))
            : (!ifFetchingActivity && publicProfileActivity.length > 0)
            && (
              <div className="feed__activity__load">
                <p>No activity at this address yet</p>
              </div>
            )
          }

        </div>
      </div>
      <div className="feed__footer">
        <div className="logo__icon--footer">
          <h2>3</h2>
        </div>
      </div>
    </div>
  );

Activity.propTypes = {
  feedByAddress: PropTypes.array,
  ifFetchingActivity: PropTypes.bool,
  onPublicProfilePage: PropTypes.bool,
  verifiedGithub: PropTypes.string,
  verifiedTwitter: PropTypes.string,
  currentAddress: PropTypes.string,
  publicProfileActivity: PropTypes.array,
  location: PropTypes.object,
};

Activity.defaultProps = {
  feedByAddress: [],
  ifFetchingActivity: false,
  onPublicProfilePage: false,
  verifiedGithub: '',
  verifiedTwitter: '',
  currentAddress: '',
  publicProfileActivity: [],
  location: {},
};

const mapState = state => ({
  feedByAddress: state.threeBox.feedByAddress,
  ifFetchingActivity: state.threeBox.ifFetchingActivity,
  verifiedGithub: state.threeBox.verifiedGithub,
  verifiedTwitter: state.threeBox.verifiedTwitter,
  publicProfileActivity: state.threeBox.publicProfileActivity,
  onPublicProfilePage: state.threeBox.onPublicProfilePage,
  currentAddress: state.threeBox.currentAddress,
});

export default connect(mapState)(Activity);
