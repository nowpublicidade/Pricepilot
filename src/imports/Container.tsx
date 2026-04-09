import imgAuralisLogoWhite from "@/assets/9ce51a590f8058c94d6c348050a680a8738c1552.png";

function AuralisLogoWhite() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Auralis Logo White">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgAuralisLogoWhite} />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[20.8px]">Auralis</p>
      </div>
    </div>
  );
}

function TextLogo() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[49px]" data-name="Text logo">
      <Container1 />
    </div>
  );
}

function LinkLogo() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[10px] items-center min-h-px min-w-px overflow-clip relative" data-name="Link - Logo">
      <AuralisLogoWhite />
      <TextLogo />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[21px]">Services</p>
      </div>
    </div>
  );
}

function ContentText() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[55px]" data-name="Content → Text">
      <Container2 />
    </div>
  );
}

function LinkMenuItem() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="Link - Menu item">
      <ContentText />
    </div>
  );
}

function MenuItem() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Menu item">
      <LinkMenuItem />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[21px]">Process</p>
      </div>
    </div>
  );
}

function ContentText1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[51px]" data-name="Content → Text">
      <Container3 />
    </div>
  );
}

function LinkMenuItem1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="Link - Menu item">
      <ContentText1 />
    </div>
  );
}

function MenuItem1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Menu item">
      <LinkMenuItem1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[21px]">Industries</p>
      </div>
    </div>
  );
}

function ContentText2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[63px]" data-name="Content → Text">
      <Container4 />
    </div>
  );
}

function LinkMenuItem2() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="Link - Menu item">
      <ContentText2 />
    </div>
  );
}

function MenuItem2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Menu item">
      <LinkMenuItem2 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[21px]">Pricing</p>
      </div>
    </div>
  );
}

function ContentText3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[44px]" data-name="Content → Text">
      <Container5 />
    </div>
  );
}

function LinkMenuItem3() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="Link - Menu item">
      <ContentText3 />
    </div>
  );
}

function MenuItem3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Menu item">
      <LinkMenuItem3 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[21px]">Team</p>
      </div>
    </div>
  );
}

function ContentText4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[36px]" data-name="Content → Text">
      <Container6 />
    </div>
  );
}

function LinkMenuItem4() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="Link - Menu item">
      <ContentText4 />
    </div>
  );
}

function MenuItem4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Menu item">
      <LinkMenuItem4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[21px]">Contact</p>
      </div>
    </div>
  );
}

function ContentText5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[51px]" data-name="Content → Text">
      <Container7 />
    </div>
  );
}

function LinkMenuItem5() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="Link - Menu item">
      <ContentText5 />
    </div>
  );
}

function MenuItem5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Menu item">
      <LinkMenuItem5 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[21px]">FAQ</p>
      </div>
    </div>
  );
}

function ContentText6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[27px]" data-name="Content → Text">
      <Container8 />
    </div>
  );
}

function LinkMenuItem6() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="Link - Menu item">
      <ContentText6 />
    </div>
  );
}

function MenuItem6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Menu item">
      <LinkMenuItem6 />
    </div>
  );
}

function MenuItems() {
  return (
    <div className="content-stretch flex gap-[40px] items-center justify-center overflow-clip relative shrink-0" data-name="Menu items">
      <MenuItem />
      <MenuItem1 />
      <MenuItem2 />
      <MenuItem3 />
      <MenuItem4 />
      <MenuItem5 />
      <MenuItem6 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.8px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.5px] whitespace-nowrap">
        <p className="leading-[16.8px]">Get template</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[82px]" data-name="Container">
      <Container11 />
    </div>
  );
}

function LinkButtonState() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col items-center justify-center pb-[14px] pt-[13px] px-[25px] relative rounded-[8px] shrink-0" data-name="Link - Button state 4">
      <div className="absolute inset-0 rounded-[10px]" data-name="Stroke" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 132 44.8\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.6232 0 0 2.24 110.55 15.12)\\'><stop stop-color=\\'rgba(31,1,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(36,14,255,0.875)\\' offset=\\'0.125\\'/><stop stop-color=\\'rgba(42,28,254,0.75)\\' offset=\\'0.25\\'/><stop stop-color=\\'rgba(53,55,254,0.5)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(76,108,252,0)\\' offset=\\'1\\'/></radialGradient></defs></svg>')" }} />
      <div className="absolute bg-[#141414] inset-[2px] rounded-[6px]" data-name="Fill" />
      <Container10 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <LinkButtonState />
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px overflow-clip relative" data-name="Button">
      <Container9 />
    </div>
  );
}

function NavigationDesktop() {
  return (
    <div className="backdrop-blur-[5px] bg-[rgba(20,20,20,0.35)] relative rounded-[10px] shrink-0 w-full" data-name="Navigation Desktop">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[35px] items-center px-[20px] py-[15px] relative w-full">
          <LinkLogo />
          <MenuItems />
          <Button />
        </div>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Container">
      <NavigationDesktop />
    </div>
  );
}