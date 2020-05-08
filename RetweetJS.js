
(() => {
  const retweetButtonQuery = '[data-testid="retweet"]';
  const retweetconfirmButtonQuery = '[data-testid="retweetConfirm"]';
  const sleep = ({ seconds }) =>
    new Promise(proceed => {
      console.log(`WAITING FOR ${seconds} SECONDS...`);
      setTimeout(proceed, seconds * 1000);
    });

  const nextBatch = async () => {
    try{
      window.scrollTo(0, document.body.scrollHeight);
      await sleep({ seconds: 1 });

      const retweetButtons = Array.from(document.querySelectorAll(retweetButtonQuery));
      const retweetButtonCount = retweetButtons.length;

      if (retweetButtonCount === 0) {
        console.log(`NO TWEETS FOUND, SO I THINK WE'RE DONE`);
        console.log(`RELOAD PAGE AND RE-RUN SCRIPT IF ANY WERE MISSED`);
        return;
      }

      await Promise.all(
        retweetButtons.map(async retweetButton => {
          retweetButton.click();
          await sleep({ seconds: 1 });
          const confirmButton = document.querySelector(retweetconfirmButtonQuery);
          confirmButton.click();
        })
      );

      await sleep({ seconds: 25 });
      nextBatch();
    }
    catch(e){
      console.log("Error ",e)
      nextBatch();
    }
  };

  nextBatch();
})();
