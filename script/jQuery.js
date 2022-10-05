//const { easing } = require("jquery");

(($)=>{

  class obj{
    init(){
      this.intro();
      this.about();
      //this.works();
      this.worksWeb();
      this.worksOther();
      this.contact();
    }
    intro(){
      const img = $('.center-area img');
      let position = 'left';

      function rightMove(){
        $('.intro-win').animate({left:`-100vw`},1800,'easeInCubic');
        position = 'right';
      }
      function leftMove(){
        $('.intro-win').animate({left:`0`},1800,'easeInCubic');
        position = 'left';
      }

      $('#intro').on({
        click:function(){
          if(position === 'left'){
            rightMove();
          }
          else{ // position === 'right'
            leftMove();
          }
          //console.log(position);
        }
      });
      img.on({
        mouseenter:function(){
          if(position==='left'){return;}
          //console.log('img-hover');
          img.animate({left:`50`},300);
        },
        mouseleave:function(){
          if(position==='left'){return;}
          img.animate({left:
            `0`},300);
        }
      });

    }
    about(){
      const me = $('#about .selfie');
      const modal = $('#statusModal');
      const nextBtn = $('#about .works-btn')
      const guid = $('.status-area .status-guid');
      let meWidth = 0;
      let meHeight = 0;
      let limitPositionX = 0;
      let limitPositonY = 0;
      let windowWidth = $('#about .selfie-box').width();
      let windowHeight = $('#about .selfie-box').height();
      //이미지 크기 구하고 캐릭터 중앙 정렬
      $(me).load(function(){
        meWidth = me.width();
        meHeight= me.height();
        limitPositionX = (windowWidth - meWidth);
        limitPositonY = (windowHeight - meHeight);
        let centerX = limitPositionX/2;
        let centerY = limitPositonY/2;
        me.css({left:centerX,top:centerY});
        $('.peek-a-boo').css({left:centerX,top:centerY});
      });
      
      let moving = false;
      let mouseX = null;
      let mouseY = null;
      let mouseMoveX = null;
      let mouseMoveY = null;
      let positionX = null;
      let positionY = null;
      let positionMoveX = null;
      let positionMoveY = null;
      let statusType = 'move';
      let guidStat = 0;

////////////////////////////////////////////////////////////////////////////////
      //버튼 상태 변수에 저장
      $('#about .status-btn').on({
        click:function(){
          $('.status-btn').removeClass('on');
          $(this).addClass('on');
          statusType = $(this).val();
          if(statusType === 'research'){
            guidStat++;
          }
          guidTextFn();
        }
      });
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////      
      //STATUS 창 함수들 
      modal.hide();
      //캐릭터 움직임
      function charMoveFn(){
        me.on({
          mousedown:function(e){
            if(guidStat === 0){
              guidStat ++;
            }
            guidTextFn();
            if(statusType!=='move'){return};
            moving = true;
            mouseX = e.clientX;
            mouseY = e.clientY;
            positionX = Number(me.css('left').replace('px',''));
            positionY = Number(me.css('top').replace('px',''));
          },
          mousemove:function(e){
            if(statusType!=='move'){return};
            if(moving === false) {return}
            else{
              mouseMoveX = e.clientX - mouseX;
              mouseMoveY = e.clientY - mouseY;
              positionMoveX = positionX + mouseMoveX;
              positionMoveY = positionY + mouseMoveY;
              
              if(positionMoveX<=0 || positionMoveX>limitPositionX)return;
              if(positionMoveY<=0 || positionMoveY>limitPositonY)return;
              me.css({left:positionMoveX,top:positionMoveY});
              
            }
          },
          mouseup:function(){
            if(statusType!=='move'){return};
            moving = false;
          },
          mouseout:function(){
            if(statusType!=='move'){return};
            moving = false;
          },
          mouseenter:function(){
            $('html').css({'cursor':"url('../storage/image/web_footage/cursor_move.png'),auto"});
          },
          mouseleave:function(){
            $('html').css({'cursor':'auto'});
          }
        });
        $('#about .peek-a-boo').on({
          click:function(){
            if(guidStat === 1){
              guidStat++;
            };
            guidTextFn();
            $('#about .re-btn').attr('disabled',false);
            $('#about .re-btn').removeClass('re-btn');
          },
          mouseenter:function(){
            $('html').css({'cursor':'pointer'});
          },
          mouseleave:function(){
            $('html').css({'cursor':'auto'});
          }
        })
      }
      //캐릭터 찾기
      function charSearchFn(){

        let nowSearch = false;

        me.on({
          mouseenter:function(){
            if(statusType!=='research'){return};
            $('html').css({'cursor':"url('../storage/image/web_footage/cursor_search.png'),auto"});
            nowSearch=true;
          },
          mouseleave:function(){
            if(statusType!=='research'){return};
            $('html').css({'cursor':'auto'});
            nowSearch=false;
          },
          click:function(){
            if(nowSearch){
              $(window).scrollTop(100);
              modal.show();
              $('body').css("overflow", "hidden");
            };
          }
        });
        $('#statusModal .close-btn').on({
          click:function(){
            modal.hide();
            $('body').css("overflow", "auto");
          }
        });
        $('#statusModal .github-btn').on({
          click:function(){
            window.open("https://github.com/seoill");
          }
        })
      }
      charMoveFn();
      charSearchFn();
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
//status 안내문구
      function guidTextFn (){
        switch(guidStat){
          case 1 :
            guid.text('보물상자를 열어보세요.');
          break;
          case 2 :
            guid.text('상태를 변경해보세요.');
          break;
          case 3 :
            guid.text('캐릭터를 조사해보세요.');
          break;
        }
      }
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
      ////카드 뒤집기
      $('.card').on({
        click:function(){
          $(this).toggleClass('on');
        },
        focusin:function(){
          $(this).addClass('on');
        }
      });
      $('#section2').on({
        mouseleave:function(){
          $('.card').removeClass('on');
        }
      })
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
      nextBtn.on('click',function(){
        location.href="./works.html"
      });
////////////////////////////////////////////////////////////////////////////////

    }
    works(){
      //기본 슬라이드
      const slideWrap = $('#works .slide-wrap');
      const leftBtn = $('.left-slide-btn');
      const rightBtn = $('.right-slide-btn');
      let cnt = 0;

      rightBtn.on({
        click:function(e){
          e.preventDefault();
          if(cnt>=3)return;
          cnt++;
          slideWrap.animate({left:`${cnt*-100}%`});
        }
      });
      leftBtn.on({
        click:function(e){
          e.preventDefault();
          if(cnt<=0)return;
          cnt--;
          slideWrap.animate({left:`${cnt*-100}%`});
        }
      });

      $('.password-btn').on({
        click:function(e){
          e.preventDefault();
          if($('.password-input').val()==='vis1234'){
            //alert('ok');
            window.open('http://wirobotics.kr/CES2023/');
          }
          else{
            alert('올바른 비밀번호를 입력해주세요.')
          }
        }
      });
    }
    worksWeb(){
      const workList = [
        {
          idx : 0,
          title : 'Kurly signup form',
          useTool : 'HTMLl, CSS, JavaS cript, jQuery, mySql, PHP, React',

          link1 : 'http://www.jihyecpofo.kr/kurly/#',
          link2 : '',

          text1: '#Clone coding, #No plugin',
          text2: '신선식품 샛별배송 쇼핑몰 마켓컬리의 회원가입폼입니다. 상세한 회원가입 조건처리가 특징으로 호스팅한 후 DB 사용해 제작하여 로그인과 회원가입이 가능합니다. 리액트는 닷홈 호스팅에는 CDN방식을, 깃허브에는 CRA방식을 사용했습니다.',
          text3: '콘솔을 이용한 쿠키 제어, 정규표현식과 if문을 활용한 입력 제한 조건, 아이디/이메일 입력시 DB에서 데이터를 가져와 중복 아이디 체크, 회원가입 폼 작성시 php를 통해 DB로 정보 저장, Math함수를 이용한 휴대폰 인증키, Date함수를 사용한 생년월일 입력제한, 비거나 올바르지 않은 input 데이터 인식'
        },
        {
          idx : 1,
          title : 'D Museum main page',
          useTool : 'HTML, Scss/Sass, Java Script, jQuery',

          link1: 'https://seoill.github.io/Web_Portfolio3/',
          link2: 'https://github.com/seoill/Web_Portfolio3',

          text1: '#Clone coding, #Responsive design, #No plugin',
          text2: '대림문화재단에서 운영하는 디뮤지엄의 웹페이지입니다. 전시 외에도 다양한 행사와 굿즈등의 정보가 포함되어있습니다. ',
          text3: '메인페이지 페이드 인/아웃 슬라이드, 스크롤 인식 헤더, 섹션 1번 드래그 슬라이드'
        },
        {
          idx : 2,
          title : 'WIM',
          useTool : 'HTML, Scss/Sass, Java Script, jQuery, php, mySql',

          link1 : '',
          link2 : '',

          text1: '#Responsive design',
          text2: '위로보틱스의 보행보조를 위한 스마트 웨어러블 디바이스 WIM의 제품 소개 웹사이트입니다. 제품 출시 문제로 웹링크와 코드는 출시 전까지 비공개 처리되었으며 현장 시연만 가능합니다. 반응형 디자인과 코딩을 맡아 작업 진행하였습니다.',
          text3: '반응형 헤더 메뉴, 메인 영상 섹션, PHP로 구현한 게시판, 카카오지도 API, 반응형 뉴스 갤러리'
        },
        {
          idx : 3,
          title : '#Personal Portfolio',
          useTool : 'HTML, Scss/Sass, Java Script, jQuery',

          link1 : '',
          link2 : '',

          text1: '#No plugin',
          text2: `개인 포트폴리오 사이트입니다. 기획, 디자인, 코딩 모두 절차를 거쳐 제작했습니다. 저의 장점인 확장성과 넓은 지식에 초점을 맞추어 메인 컨셉을 “Bridge”로 정하였고 단단한, 벽돌, 수평적인, 연결된 네 가지의 디자인 키워드를 도출했습니다. 포트폴리오 사이트인 만큼 클릭하고, 뒤집고, 드래그하는 등의 여러 인터랙션을 통해 제 영역으로 넘어와 저라는 사람을 찾아내고 발견하는 사용자 경험을 주려고 했습니다.`,
          text3: '인트로 인터렉션, 게임 컨셉을 차용한 Check Status 섹션, 프로젝트 슬라이드들, Contact의 명함 꺼내기'
        },
        {
          idx : 4,
          title : 'Brando Pofo main page',
          useTool : 'HTML, Scss/sass, Java Script, jQuery, php, mySql',

          link1 : 'http://jihyecpofo.kr/brando_pofo/',
          link2 : 'https://github.com/seoill/Web_Portfolio2',

          text1: '#Clone coding, #Responsive design, #No plugin',
          text2: '웹 템플릿을 판매하는 에이전시 브란도의 포보 사이트입니다. ',
          text3: '퀵메뉴, 패럴럭스 애니메이션, 반응형 갤러리, SVG 애니메이션, input 정보 DB 저장, DB 내용 파일로 다운로드'
        }
        
      ]
      const prevBtn = $('.prev-btn');
      const nextBtn = $('.next-btn');

      const slide = $('.slide-wrap').children();
      const slideNext = $('.slide-wrap li:gt(2)');
      const slidePrev = $('.slide-wrap li:lt(2)');

      const mainSlide = $('#works #section1 .slide-wrap').children().eq(2);
      const mainSlideTitle = $('#works #section1 .slide-title');

      const modal = $('#webWorkModal');
      const closeBtn = $('#webWorkModal .close-btn');
      const closeBg = $('#webWorkModal .close-bg');
      const modalTitle = $('#webWorkModal .web-title')
      const modalLink1 = $('#webWorkModal .web-link');
      const modalLink2 = $('#webWorkModal .code-link');
      const modalUse = $('#webWorkModal .web-use');
      const modalText1 = $('#webWorkModal .web-keyword');
      const modalText2 = $('#webWorkModal .web-ex');
      const modalText3 = $('#webWorkModal .web-point');
      const modalImg = $('#webWorkModal #webImgBox');

      const slideArr = ['bg0', 'bg1','bg2','bg3','bg4']
      const titleArr = ['Kurly','D Museum', 'WIM', 'Personal Portfolio','Brando Pofo'];


      let setId = undefined;
      let cnt = 2;
  
      ////////////////////////////////////////////////////////////////////////////////
      //슬라이드 자체
      function sliderFn(){
        //각각 li tag에 들어갈 것

        let s0cnt = cnt-2;
        s0cnt==-1?s0cnt=4:s0cnt && s0cnt==-2?s0cnt=3:s0cnt;

        let s1cnt = cnt-1;
        s1cnt==-1?s1cnt=4:s1cnt;

        let s2cnt = cnt;

        let s3cnt = cnt+1;
        s3cnt==5?s3cnt=0:s3cnt;

        let s4cnt = cnt+2;
        s4cnt==6?s4cnt=1:s4cnt && s4cnt==5?s4cnt=0:s4cnt;

        //위에서 받아온 s${n}num 변수를 switch case로 숫자 n일 때 slideArr의 n번 내용을 가져오기
        //slide.animate({opacity:'.5'},100,function(){ $(this).animate({opacity:'1'},200)});
        slide.removeClass();

        switch(s0cnt){
          case 0:
            slide.eq(0).addClass(slideArr[0])
            break;
          case 1:
            slide.eq(0).addClass(slideArr[1])
            break;
          case 2:
            slide.eq(0).addClass(slideArr[2])
            break;
          case 3:
            slide.eq(0).addClass(slideArr[3])
            break;
          case 4:
            slide.eq(0).addClass(slideArr[4])
            break;
        }
        switch(s1cnt){
          case 0:
            slide.eq(1).addClass(slideArr[0])
            break;
          case 1:
            slide.eq(1).addClass(slideArr[1])
            break;
          case 2:
            slide.eq(1).addClass(slideArr[2])
            break;
          case 3:
            slide.eq(1).addClass(slideArr[3])
            break;
          case 4:
            slide.eq(1).addClass(slideArr[4])
            break;
        };
        switch(s2cnt){
          case 0:
            slide.eq(2).addClass(slideArr[0])
            break;
          case 1:
            slide.eq(2).addClass(slideArr[1])
            break;
          case 2:
            slide.eq(2).addClass(slideArr[2])
            break;
          case 3:
            slide.eq(2).addClass(slideArr[3])
            break;
          case 4:
            slide.eq(2).addClass(slideArr[4])
            break;
        };
        switch(s3cnt){
          case 0:
            slide.eq(3).addClass(slideArr[0])
            break;
          case 1:
            slide.eq(3).addClass(slideArr[1])
            break;
          case 2:
            slide.eq(3).addClass(slideArr[2])
            break;
          case 3:
            slide.eq(3).addClass(slideArr[3])
            break;
          case 4:
            slide.eq(3).addClass(slideArr[4])
            break;
        }
        switch(s4cnt){
          case 0:
            slide.eq(4).addClass(slideArr[0])
            break;
          case 1:
            slide.eq(4).addClass(slideArr[1])
            break;
          case 2:
            slide.eq(4).addClass(slideArr[2])
            break;
          case 3:
            slide.eq(4).addClass(slideArr[3])
            break;
          case 4:
            slide.eq(4).addClass(slideArr[4])
            break;
        };

        $('.slide-title').text(titleArr[cnt]);

      };
      function nextCount(){
        cnt++;
        if(cnt >= 5){cnt=0};
        sliderFn();
      };
      function prevCount(){
        cnt--;
        if(cnt < 0) {cnt=4}
        sliderFn();
      };
      function slideCounter(){
        setId = setInterval(()=>{nextCount()}, 5000);
      }
      slideCounter();

      prevBtn.on({
        click:function(){
          clearInterval(setId);
          prevCount();
          setTimeout(slideCounter(), 5000);
        }
      });
      slidePrev.on({
        click:function(){
          clearInterval(setId);
          prevCount();
          setTimeout(slideCounter(), 5000);
        }
      })
      nextBtn.on({
        click:function(){
          clearInterval(setId);
          nextCount();
          setTimeout(slideCounter(), 5000);
        }
      });
      slideNext.on({
        click:function(){
          clearInterval(setId);
          nextCount();
          setTimeout(slideCounter(), 5000);
        }
      });
  
      ////////////////////////////////////////////////////////////////////////////////

      ////////////////////////////////////////////////////////////////////////////////
      //모달 관련 기능
      //팝업 내용 정리
      function whatIsMain(){
        //console.log('click');
        //자동으로 슬라이드 넘어가기 취소
        clearInterval(setId);

        if(cnt===2 || cnt===3){
          //console.log('wim selected');
          $('.code-link').hide();
        };

        let nowCnt = cnt;
        let selectedSlide = {};
        $.map(workList, function(obj){
          if(nowCnt === obj.idx){
            selectedSlide = obj;
          }
        });
        modalTitle.text(selectedSlide.title);
        modalLink1.attr("href", selectedSlide.link1);
        modalLink2.attr("href", selectedSlide.link2);
        modalUse.text(selectedSlide.useTool);
        modalText1.text(selectedSlide.text1);
        modalText2.text(selectedSlide.text2);
        modalText3.text(selectedSlide.text3);
        modalImg.removeClass();
        modalImg.addClass(`bg${nowCnt}`);

        //링크 클릭시 화면 바뀌는 거 방지 & 클릭 이동
        if(selectedSlide.link1 === ''){
          modalLink1.on("click",function(e){e.preventDefault()});
        };
        if(selectedSlide.link2 === ''){
          modalLink2.on("click",function(e){e.preventDefault()});
        };

        modal.show();
        $('body').css("overflow", "hidden");
      };

      mainSlide.on({
        click:function(){
          whatIsMain();
        }
      });
      mainSlideTitle.on({
        click:function(){
          whatIsMain();
        }
      });
      function modalCloseFn(){
        modal.hide();
        $('body').css("overflow", "auto");
        slideCounter();
      }
      closeBtn.on("click",()=>{modalCloseFn()});
      closeBg.on("click",()=>{modalCloseFn()});

      //웹링크 누를 시 이동 주소 설정
      $('.web-link').on('click',function(){
        switch(cnt){
          case 0 : //kurly
            window.open('http://www.jihyecpofo.kr/kurly/');
            break;
          case 1 : //Dmuseum
              window.open('https://seoill.github.io/Web_Portfolio3/');
            break;
          case 2 : // WIM
              window.open('http://www.jihyecpofo.kr/wim/');
            break;
          case 3 : // 개인 포폴
              window.open('http://www.jihyecpofo.kr/');
            break;
          case 4 : //pofo
          window.open('http://www.jihyecpofo.kr/pofo/');
            break;
          
        }
      });
      //코드 링크 누를 시 이동 주소 설정
      $('.code-link').on('click',function(){
        switch(cnt){
          case 0 : //kurly
            window.open('https://github.com/seoill/Web_Portfolio1');
            break;
          case 1 : //Dmusuem
            window.open('https://github.com/seoill/Web_Portfolio3');
            break;
          case 3 :
            window.open('https://github.com/seoill/Web_Portfolio4')
            break;
          case 4 : // Pofo
              window.open('https://github.com/seoill/Web_Portfolio2')
            break;
        }
      });

      /////////////////////////////////////////////////////////////////////////////////
    }
    worksOther(){
      const itemList = [
        {
          nickName:"peacock",
          makingYear:"2021",
          type:"personal",
          summary:"졸업작품으로 제작한 식품 브랜드 피코크 리브랜딩 & 영상 프로젝트입니다.",
          text:"마켓 리서치, 브랜드 리서치, 유저 리서치, 페르소나 & 사용자여정의 과정을 거쳐 브랜드 전략을 도출했습니다. 이와 같은 프리 프로덕션을 진행하고 PPB(pre-production book)를 제작하였습니다. 영상은 모션그래픽 애니메이션으로 제작되었으며 PP내용을 요약한 모션 그래픽 파트와 브랜드 필름 파트로 구성되어 있습니다. ",
          usetool:'Photoshop, Illustrator, Premiere pro, AffterEffect',

          other:``,
          video:'<iframe class="vid" width="560" height="315" src="https://www.youtube.com/embed/dApQM2tI0Yg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          pdf:'<iframe class="pdf" src="../storage/pdf/peacock.pdf"></iframe>'
        },
        {
          nickName:"redConnect",
          makingYear:"2020",
          type:"personal",
          summary:"헌혈 어플 레드커넥트의 UX 개선 프로젝트입니다.",
          text:"마켓 리서치, 유저리서치, 페르소나를 거쳐 전략을 도출했습니다. 타겟 그룹에 맞춘 개선점인 헬스케어 기능 강조와 강화, 콜렉팅 요소 추가, 보람을 강조하는 문구 추가, 헌혈 예약 기능 강화 네 가지를 중점적으로 요소들을 수정하고 프로토타이핑 툴인 Protopie를 사용해 구현하였습니다.",
          usetool:'Photoshop, Illustrator, Protopie',

          other:'<a class="red-con" target="_blank" href="https://cloud.protopie.io/p/6b698f02c1?touchHint=true&ui=true&scaleToFit=false&cursorType=touch&mockup=true&bgColor=%23F5F5F5&playSpeed=1&playerAppPopup=true">프로토타입 확인하러 가기</a>',
          video:'',
          pdf:'<iframe class="pdf" width="100%" src="../storage/pdf/redConnect.pdf"></iframe>'
        },
        {
          nickName:"rotoscope",
          makingYear:"2020",
          type:"team",
          summary:"미디어에 매몰된 나의 이상향이란 주제로 제작된 애니메이션입니다. 로토스코핑 기법을 이용했으며 기획, 연출 그리고 애니메이팅을 포함해 전체 제작을 한 개인 프로젝트입니다.",
          text:"",
          usetool:'Premiere pro, AffterEffect, ClipStudio',

          other:``,
          video:'<iframe class="vid" width="560" height="315" src="https://www.youtube.com/embed/O-whQlP52IM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          pdf:''
        },
        {
          nickName:"wemedi",
          makingYear:"2019",
          type:"team",
          summary:"스마트 헬스케어 어플 ‘위메디'를 기획한 팀 프로젝트입니다. 기획 일부와 어플디자인 / 목업 제작으로 참여했습니다. ",
          text:"질병은 때를 가리지 않지만 병원에 갈 수 있는 조건은 한정적이라는 문제점을 가지고 어플을 기획했습니다. 증상에 따라 의약품을 검색하고 주변의 약국과 은행을 검색해 보여주는 어플입니다. ‘여행 시'를 중점적인 사용 상황으로 잡고 해외에서도 사용 가능한 어플을 기획했습니다.",
          usetool:'Photoshop, Illustrator',

          other:`
            <img src='../storage/image/design_pofo/wemedi1.jpg'></img>
            <img src='../storage/image/design_pofo/wemedi2.jpg'></img>
          `,
          video:'',
          pdf:''
        },
        {
          nickName:"coupang",
          makingYear:"2020",
          type:"team",
          summary:"쿠팡 리브랜드 프로젝트입니다. ",
          text:"쇼핑 어플인 쿠팡 자체가 아닌 쿠팡이라는 브랜드 일체를 대상으로 했습니다. 전체 기획 총괄을 맡았으며 리서치, 페르소나, 브랜드 전략 도출 등에 중점적으로 참여했습니다.",
          usetool:'Photoshop, Illustrator',
          other:``,
          video:'',
          pdf:'<iframe class="pdf" width="100%" src="../storage/pdf/coupang.pdf"></iframe>'
        },
        {
          nickName:"closeTo",
          makingYear:"2020",
          type:"personal",
          summary:"수제청 브랜드 클로즈투의 커머셜 영상입니다. 모션그래픽 애니메이션으로 제작되었습니다.",
          text:"모든 에셋은 직접 제작했으며 캐릭터는 에프터이펙트의 퍼펫을 이용해 애니메이팅했습니다. 사회적 기업이기 때문에 건강한, 사회적 가치등에 대해 중점적으로 표현하기를 원하셨고 그에 맞추어 연결, 생기있는, 따듯한을 키워드로 잡고 제작하였습니다.",
          usetool:'Photoshop, Illustrator, Premiere pro, AffterEffect',

          other:``,
          video:'<iframe class="vid" width="560" height="315" src="https://www.youtube.com/embed/uR9ggPf0mLU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          pdf:''
        },
        {
          nickName:"vegan",
          makingYear:"2020",
          type:"personal",
          summary:"발화자를 반전시켜 육식주의를 컨셉으로 제작된 애니메이션입니다.",
          text:'',
          usetool:'Photoshop, Illustrator, Premiere pro, AffterEffect',
          
          other:``,
          video:'<iframe class="vid" width="560" height="315" src="https://www.youtube.com/embed/u_YNtp3I_k0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          pdf:''
        },
        {
          nickName:"heokOh",
          makingYear:"2019",
          type:"personal",
          summary:"혁오 ‘큰 새’ 키네틱 타이포 애니메이션입니다.",
          text:"",
          usetool:'Illustrator, After effect',
          
          other:``,
          video:'<iframe class="vid" width="560" height="315" src="https://www.youtube.com/embed/e-wD8Veet28" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          pdf:''
        },
        {
          nickName:"sleep",
          makingYear:"2019",
          type:"personal",
          summary:"",
          text:"",
          usetool:'Illustrator',
          
          other:`<img src='../storage/image/design_pofo/sleep.jpg'></img>`,
          video:'',
          pdf:''
        },
        {
          nickName:"likeBook",
          makingYear:"2019",
          type:"personal",
          summary:"독립잡지 편애서점의 로고와 소개 페이지입니다.",
          text:"",
          usetool:'Illustrator, InDesign',
          
          other:`
          //<img src='../storage/image/design_pofo/likeBook1.jpg'></img>
          //<img src='../storage/image/design_pofo/likeBook2.jpg'></img>`,
          video:'',
          pdf:''
        },
        {
          nickName:"momoco",
          makingYear:"2019",
          type:"personal",
          summary:"영화 ‘불량공주 모모코'를 베이스로 제작된 오프닝 시퀀스 모션그래픽 애니메이션입니다. 영화 전반에 사용된 주요 오브젝트를 영화의 키치한 분위기에 맞추어 배치하였습니다.",
          text:"",
          usetool:'Photoshop, Illustrator, Premiere pro, AffterEffect',
          
          other:``,
          video:'<iframe class="vid" width="560" height="315" src="https://www.youtube.com/embed/IBcEZn8-A-Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
          pdf:''
        },
        {
          nickName:"stadew",
          makingYear:"2021",
          type:"personal",
          summary:"게임 ‘스타듀벨리'의 달빛 해파리들의 춤 축제를 포스터로 만들었습니다.",
          text:"",
          usetool:'Photoshop, Illustrator',
          
          other:`
            <img src='../storage/image/design_pofo/stardew1.jpg'></img>
            <img src='../storage/image/design_pofo/stardew2.jpg'></img>
          `,
          video:'',
          pdf:''
        },
        {
          nickName:"mintLife",
          makingYear:"2019",
          type:"personal",
          summary:"뷰티풀 민트 라이프의 포스터를 제작했습니다. cinema 4d로 오브젝트를 제작하고 렌더링 한 후 포토샵으로 타이포를 넣었습니다.",
          text:"",
          usetool:'Photoshop, Illustrator',
          
          other:`
            <img src='../storage/image/design_pofo/mintLife1.jpg'></img>
            <img src='../storage/image/design_pofo/mintLife2.jpg'></img>
            <img src='../storage/image/design_pofo/mintLife3.jpg'></img>`,
          video:'',
          pdf:''
        },
        {
          nickName:"c4d",
          makingYear:"2019",
          type:"personal",
          summary:"C4D 프리 모델링을 가져와 질감을 바꾸고 렌더링 해 만든 그래픽 이미지들입니다. 포토샵으로 이미지 색감을 후보정했습니다.",
          text:"",
          usetool:'Photoshop, Illustrator, Cinema4D',
          
          other:`
          <img src='../storage/image/design_pofo/c4d1.jpg'></img>
          <img src='../storage/image/design_pofo/c4d2.jpg'></img>
          <img src='../storage/image/design_pofo/c4d3.jpg'></img>
          <img src='../storage/image/design_pofo/c4d4.jpg'></img>
          <img src='../storage/image/design_pofo/c4d5.jpg'></img>
          <img src='../storage/image/design_pofo/c4d6.jpg'></img>
          <img src='../storage/image/design_pofo/c4d7.jpg'></img>
          `,
          video:'',
          pdf:''
        },
        {
          nickName:"youngerSchool",
          makingYear:"2019",
          type:"personal",
          summary:"청년학교의 행사 팜플렛입니다.",
          text:"",
          usetool:'Photoshop, Illustrator',
          
          other:`
            <img src='../storage/image/design_pofo/youngSchool1.jpg'></img>
            <img src='../storage/image/design_pofo/youngSchool2.jpg'></img>
            <img src='../storage/image/design_pofo/youngSchool3.jpg'></img>
          `,
          video:'',
          pdf:''
        },
        {
          nickName:"kuff",
          makingYear:"2019",
          type:"personal",
          summary:"공주대학교 영상제 Kuff의 팜플렛과 현수막입니다. 주요 이미지가 나온 상태에서 컨셉과 오브젝트를 따와 제작하였습니다.",
          text:"",
          usetool:'Photoshop, Illustrator',
          
          other:`
            <img src='../storage/image/design_pofo/kuff1.jpg'></img>
            <img src='../storage/image/design_pofo/kuff2.jpg'></img>
            <img src='../storage/image/design_pofo/kuff3.jpg'></img>`,
          video:'',
          pdf:''
        },
        {
          nickName:"younggeul",
          makingYear:"2018",
          type:"personal",
          summary:"대학언론연합 동아리 영글의 잡지 편집 디자인입니다. 인디자인을 메인으로 제작했습니다.",
          text:"",
          usetool:'Photoshop, InDesign',
          
          other:`
            <img src='../storage/image/design_pofo/younggeul1.jpg'></img>
            <img src='../storage/image/design_pofo/younggeul2.jpg'></img>
          `,
          video:'',
          pdf:''
        },
        {
          nickName:"flower",
          makingYear:"2018",
          type:"personal",
          summary:"",
          text:"",
          usetool:'Illustrator',
          
          other:`<img src='../storage/image/design_pofo/flower.jpg'></img>`,
          video:'',
          pdf:''
        },
        {
          nickName:"thoneApple",
          makingYear:"2018",
          type:"personal",
          summary:"",
          text:"",
          usetool:'Illustrator',
          
          other:`<img src='../storage/image/design_pofo/thoneApple.jpg'></img>`,
          video:'',
          pdf:''
        },
        {
          nickName:"witchTea",
          makingYear:"2022",
          type:"personal",
          summary:"웹툰 ‘마가의 찻집’의 타이틀 디자인입니다.",
          text:"",
          usetool:'Illustrator',
          
          other:`<img src='../storage/image/design_pofo/witchTea.jpg'></img>`,
          video:'',
          pdf:''
        }
      ];
      const filterBtn = $('#works .filter-btn');
      const item = $('.item-box .item');
      const wrap = $('.item-box .item .wrap');
      const info = $('#section2 .info-box');
      const infoCloseBtn = $('.info-box .close-btn');
      const iTitle = $('.info-box .item-title');
      const iYear = $('.info-box .item-making-year');
      const iFilter = $('.info-box .item-filter');
      const iUseTool = $('.info-box .item-use-tool');
      const iType = $('.info-box .item-type');

      const iText = $('.info-box .sum-and-text');
      const iVideoBox = $('.info-box .vid-box');
      const iPdfBox = $('.info-box .pdf-box');
      const iOtherBox = $('.info-box .other-box');

      let selectFilter = 'all';
      let clickedContent = {id:'',title:'',filter:''};
      let isInfoShow = false;

      ////////////////////////////////////////////////////////////////////////////////
      //필터로 갤러리 정렬
      filterBtn.on({
        click:function(){
          selectFilter = $(this).val();
          filterBtn.removeClass('on');
          $(this).addClass('on');
          gallerySort();
        }
      });

      function gallerySort(){
        
        ////나타났다 사라졌다
        wrap.css({'width':'0%','height':'0%', opacity: '0'},300,"swing");
        setTimeout(function(){wrap.css({'width':'100%','height':'100%','opacity':'1'},800,"swing");},350)
        ////

        item.show();
        if(selectFilter !== 'all'){
          item.not(`.${selectFilter}`).hide();
        }

        ////ux 프로젝트 수가 적어서 그리드 안깨지게 CSS 조정해주기
        if(selectFilter === 'uxui'){
          item.children('.gap').css({height: '50%'});
        }
        else{
          item.children('.gap').css({height: '100%'});
        };
        ////


      };
      ////////////////////////////////////////////////////////////////////////////////

      ////////////////////////////////////////////////////////////////////////////////
      //아이템 눌러 설명 확인하기 == 설명 화면 틀기
      item.on({
        click:function(){
          clickedContent.id = $(this).attr('id');
          clickedContent.title = $(this).find('.item-title').text();
          clickedContent.filter = $(this).find('.item-filter').text();
          //console.log(clickedContent);
          changeContentFn();
          isInfoShow = true;
          info.fadeIn(300);      
          scrollStop();
        }
      });
      infoCloseBtn.on({
        click:function(){
          isInfoShow = false;
          info.fadeOut(0);
          $(window).off('scroll');
        }
      });

      //콘텐츠 내용 바꿔주는 함수
      function changeContentFn(){
        let selectedItem = {};
        $.map(itemList, function(obj, index){
          if(obj.nickName === clickedContent.id){
            selectedItem = obj;
          }
        });
        iTitle.text(clickedContent.title);
        iFilter.text(clickedContent.filter);
        iYear.text(selectedItem.makingYear);
        iUseTool.text(selectedItem.usetool);
        iType.text(selectedItem.type);
        iText.html('<span class="highlight2">'+selectedItem.summary+'</span>'+'<br/><br/>'+selectedItem.text);

        //other 있는지 없는지
        if(selectedItem.other!==''){
          iOtherBox.html(selectedItem.other);
        }else{iOtherBox.html('')};
        //video 있는지 없는지
        if(selectedItem.video!==''){
          iVideoBox.html(selectedItem.video);
        }else{iVideoBox.html('')};
        //pdf 있는지 없는지
        if(selectedItem.pdf!==''){
          iPdfBox.html('PDF는 다운받아 읽는 걸 추천드립니다.'+selectedItem.pdf);
        }else{iPdfBox.html('')};

      };
      //infoBox show 됐을 때 스크롤 고정시키는 함수
      function scrollStop(){
        //인포탑 위치 지정해주기
        let infoTop = info.offset().top-80;
        if(isInfoShow){
          //스크롤탑고정
        $(window).scrollTop(infoTop);
        $(window).on('scroll',function(){$(window).scrollTop(infoTop);});
        }
        else{
          return;
        }
      }
    }
    contact(){
      const emailBtn = $('#contact .contact-email');
      const card = $('#contact .card-area');

      emailBtn.on('click',function(e){        
        e.preventDefault();
        navigator.clipboard.writeText("jihyec22@gmail.com")
        .then(() => {
          alert('이메일이 복사되었습니다.');
        });
      });

      card.on('click',function(){
        //console.log('ok');
        card.animate({left:`550`},800,'easeInOutQuint');
        card.css({'cursor':'auto'});
      });

    }
  }

  const newObj = new obj();
  newObj.init();

})(jQuery);