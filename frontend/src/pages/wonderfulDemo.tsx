import React, { useState, useEffect } from 'react';

const WonderfulDemo = () => {
  const [previousBankSelections, setPreviousBankSelections] = useState([] as string[]);
  const [currentBankSelection, setCurrentBankSelection] = useState(null as null | string);
  const [paymentAmount, setPaymentAmount] = useState(1.99);
  const [payeeName, setPayeeName] = useState('All Ears Audio');
  const [initialMultiBankState, setInitialMultiBankState] = useState(false);
  const [transitionBank, setTransitionBank] = useState(null as null | string);

  useEffect(() => {
    // Get previously stored bank selections from local storage
    const bankSelections = localStorage.getItem('bankSelections');

    if (bankSelections) {
      let bankSelectionsArray = JSON.parse(bankSelections);
      console.log('bankSelections', bankSelectionsArray);
      if (bankSelectionsArray.length === 1) {
        setCurrentBankSelection(bankSelectionsArray[0]);
      }
      else if (bankSelectionsArray.length > 1) {
        setInitialMultiBankState(true);
      }

      setPreviousBankSelections(bankSelectionsArray);
    }
  }, []);

  const bankCard = (bankName: string, bankColour: string, bankLogo: string, index: number) => {
    const isSelected = currentBankSelection === bankName;
    const isAbove = currentBankSelection && !isSelected;
    const indexOfSelectedBank = currentBankSelection ? bankOptions.findIndex(bank => bank.name === currentBankSelection) : null;
    const topOffsetIndexOfBank = !indexOfSelectedBank ? index : index < indexOfSelectedBank ? index : index - 1;

    let topOffset = "0px";
    if (initialMultiBankState) {
      topOffset = `${topOffsetIndexOfBank * 4 + 90}%`;
    }
    else if (currentBankSelection) {
      topOffset = isSelected ? "0px" : `${topOffsetIndexOfBank * 4 + 90}%`;
    }
    else {
      topOffset = `${index * 125}px`;
    }
    
    return (
      <div
        key={index}
        onClick={() => {
          if (currentBankSelection && currentBankSelection !== bankName) {
            setInitialMultiBankState(false);
            setCurrentBankSelection(null);
          }
          else {
            setInitialMultiBankState(false);
            setCurrentBankSelection(bankName)
          }
        }}
        className={`flex flex-col items-end justify-start w-full h-[175px] rounded-xl bg-[#${bankColour}] card-shadow cursor-pointer overflow-hidden p-2 border border-[#bcc0c1] transition-all duration-500 ease-in-out transform ${isSelected ? 'selected' : isAbove ? 'below' : ''}`}
        style={{
          position: 'absolute',
          top: topOffset,
          left: 0,
          right: 0,
          margin: '0 auto',
          zIndex: isSelected ? 10 : index + 1,
          backgroundColor: `#${bankColour}`,
          transition: 'top 0.5s ease',
        }}
      >
        <img src={bankLogo}
          alt={`${bankName} logo`}
          className="h-8"
        />
      </div>
    );
  }

  const bankOptions = [
    {
      name: 'Monzo Joint',
      colour: 'f6f9f9',
      logo: '/monzojoint.png',
      selectionLogo: '/monzojointSelection.png'
    },
    {
      name: 'Revolut',
      colour: 'ff6d18',
      logo: 'https://via.placeholder.com/150',
      selectionLogo: '/revolutSelection.png'
    },
    {
      name: 'Starling',
      colour: '1d1934',
      logo: 'https://via.placeholder.com/150',
      selectionLogo: '/starlingSelection.png'
    }
  ];

  const dummyBankTransition = (bankName: string) => {
    console.log(`Transitioning to ${bankName}...`, previousBankSelections);
    if (!previousBankSelections.includes(bankName)) {
      console.log('Storing bank selection...');
      // Store bank selections in local storage
      localStorage.setItem('bankSelections', JSON.stringify([...previousBankSelections, bankName]));
      setPreviousBankSelections([...previousBankSelections, bankName]);
    }

    setTransitionBank(bankName);
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-10 p-4 md:p-8 bg-[#f2f2f7] relative">
      {transitionBank 
        ? (
          <div 
            className="w-full text-center flex flex-col items-center justify-center "
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <p>Transitioning to {transitionBank}...</p>
          </div>
          )
      : <div className="w-full flex flex-col items-center relative flex-grow">
          {bankOptions.map((bank, index) => (
            bankCard(bank.name, bank.colour, bank.logo, index)
          ))}

          {initialMultiBankState && previousBankSelections.length > 1 && (
            <div 
            className="w-full text-center flex flex-col items-center justify-center "
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <p className="text-[#333333]">Complete this payment using</p>
            <div className={`${previousBankSelections.length > 3 ? 'grid grid-cols-2' : 'flex'} gap-4 my-4`}>
              {previousBankSelections.map((bankName, index) => {
                let bank = bankOptions.find(bank => bank.name === bankName);
                if (bank && bank.name) {
                  return (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <img 
                      src={bank?.selectionLogo} 
                      alt={`${bank.name ? bank.name : "monzo"} logo`} 
                      className="h-16 card-shadow cursor-pointer rounded-2xl" 
                      onClick={() => dummyBankTransition(bank ? bank.name : "monzo")}
                    />
                    <h3 className="text-xs uppercase">{bank.name ? bank.name : "monzo"}</h3>
                  </div>
                  );
                }
              })}
            </div>
            <h2 className="text-3xl font-bold">£{paymentAmount}</h2>
            <p className="text-[#333333]">{payeeName}</p>
          </div>
        )}

          {currentBankSelection && (
            <div 
              className="w-full text-center flex flex-col items-center justify-center "
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 0,
              }}
            >
              <p className="text-[#333333]">Complete this payment using your</p>
              <h3 className="textlg font-bold uppercase">{currentBankSelection}&nbsp;account</h3>
              <img 
                src={bankOptions.find(bank => bank.name === currentBankSelection)?.selectionLogo} 
                alt={`${currentBankSelection} logo`} 
                className="h-16 mt-4 mb-8 card-shadow cursor-pointer rounded-2xl" 
                onClick={() => dummyBankTransition(currentBankSelection)}
              />
              <h2 className="text-3xl font-bold">£{paymentAmount}</h2>
              <p className="text-[#333333]">{payeeName}</p>
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default WonderfulDemo;