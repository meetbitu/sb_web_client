import React from 'react';

import InviteTypeChoice from './InviteTypeChoice.jsx';

import coco from '../coco.png';

function InviteTypeChooser({ setInviteTypeData }) {
  return (
    <div className="invite-type-chooser">
      <InviteTypeChoice
        type="coco"
        title="CocoIchibanya"
        description="The one and only"
        setInviteTypeData={setInviteTypeData}
        imgSrc={coco}
      />
      {/*<InviteTypeChoice
        type="custom"
        title="Create your own"
        description="Invite your friends to make sabay"
        setInviteTypeData={setInviteTypeData}
        emoji="☑️"
      />*/}
    </div>
  );
}

export default InviteTypeChooser;
