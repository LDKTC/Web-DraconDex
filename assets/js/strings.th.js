/* Thai strings for the language switch (assets/js/lang.js). Keyed to match
   each page's data-i18n="key" / data-i18n-attr="attr:key" attributes. English
   lives directly in the HTML — lang.js caches it the first time an element is
   translated, so there is nothing to list here for the English side. Values
   may contain the same inline markup (<code>, <a>, <strong>, …) as the
   English they replace. */
window.DDStrings = {
  /* --- shared: nav, footer, lightbox -------------------------------------- */
  "common.skip": "ข้ามไปยังเนื้อหา",
  "common.nav.home": "หน้าแรก",
  "common.nav.download": "ดาวน์โหลด",
  "common.nav.plugins": "ปลั๊กอิน",
  "common.nav.docs": "เอกสาร",

  "common.footer.tagline": "สร้างโลกนิยายแบบออฟไลน์ สำหรับนักเขียน นักออกแบบเกม และ DM",
  "common.footer.getit": "ดาวน์โหลด",
  "common.footer.allreleases": "รีลีสทั้งหมด",
  "common.footer.npm": "แพ็กเกจ npm",
  "common.footer.officialplugins": "ปลั๊กอินทางการ",
  "common.footer.plugintemplate": "เทมเพลตปลั๊กอิน",
  "common.footer.plugindocs": "เอกสารปลั๊กอิน",
  "common.footer.project": "โปรเจกต์",
  "common.footer.apprepo": "Repository ของแอป",
  "common.footer.issues": "แจ้งปัญหา",
  "common.footer.websitesource": "ซอร์สโค้ดเว็บไซต์นี้",
  "common.footer.built": "สร้างโดย LDKTC · สัญญาอนุญาต MIT",
  "common.footer.disclaimer": "ไม่มีส่วนเกี่ยวข้องกับผู้ให้บริการ AI ที่ปลั๊กอินเชื่อมต่อด้วย",

  "common.lightbox.aria": "ตัวแสดงภาพหน้าจอ",
  "common.lightbox.zoomout": "ซูมออก",
  "common.lightbox.zoomin": "ซูมเข้า",
  "common.lightbox.close": "ปิด",
  "common.lightbox.prev": "ภาพก่อนหน้า",
  "common.lightbox.next": "ภาพถัดไป",

  /* --- index.html ---------------------------------------------------------- */
  "home.meta.title": "DraconDex — สร้างโลกนิยายแบบออฟไลน์",
  "home.meta.description": "DraconDex คือแอปเดสก์ท็อปออฟไลน์ฟรีสำหรับจัดระเบียบข้อมูลโลกในนิยาย — ตัวละคร สถานที่ ไทม์ไลน์ ความสัมพันธ์ และโน้ตวิกิลิงก์ — ในฐานข้อมูล SQLite ในเครื่อง ดาวน์โหลดสำหรับ Windows พร้อมปลั๊กอินทางการ",

  "home.hero.pill": "ฟรี · โอเพนซอร์ส · ใช้งานได้แบบออฟไลน์",
  "home.hero.title": "โลกทั้งใบของคุณ เก็บไว้บนดิสก์ของคุณเอง",
  "home.hero.lead": "DraconDex คือแอปเดสก์ท็อปสำหรับจัดระเบียบข้อมูลเบื้องหลังเรื่องราว — ตัวละคร สถานที่ ไทม์ไลน์ ความสัมพันธ์ และโน้ตอิสระ — สำหรับนักเขียนนิยาย นักออกแบบเกม และ Dungeon Master สาย D&amp;D",
  "home.hero.cta.plugins": "ดูปลั๊กอินทั้งหมด",
  "home.hero.meta.latestPrefix": "ล่าสุด",
  "home.hero.meta.notes": "บันทึกการอัปเดต",
  "home.hero.meta.windows": "Windows · แบบพกพา หรือแบบติดตั้ง",
  "home.hero.meta.privacy": "ไม่ต้องมีบัญชี ไม่ต้องพึ่งคลาวด์ ไม่ต้องต่ออินเทอร์เน็ต",
  "home.hero.art.alt": "สัญลักษณ์ DraconDex: เข็มทิศสิบสองแฉก",

  "home.features.eyebrow": "แอปนี้ทำอะไรได้บ้าง",
  "home.features.title": "ออกแบบมาเพื่อขั้นตอนที่ยุ่งเหยิงที่สุดของการสร้างโลก",
  "home.features.lead": "ทุกอย่างอยู่ในฐานข้อมูล SQLite เครื่องเดียว ไม่มีการอัปโหลด ไม่มีการส่งข้อมูลกลับบ้าน และย้ายทั้งโปรเจกต์ไปกับแฟลชไดรฟ์ได้เลย",

  "home.features.f1.title": "สองระบบโมดูล ใช้งานคู่กันได้",
  "home.features.f1.body": "โมดูลรุ่นเก่าที่ตายตัวเจ็ดแบบ — Director, Navigator, Hero, Writer, Scribe, Sage, Artisan — ควบคู่ไปกับ \"Nexus nest\" ของ v3: ต้นไม้โมดูลที่สร้างเองได้ไม่จำกัด",

  "home.features.f2.title": "วิกิลิงก์เชื่อมโยงระหว่างโน้ต",
  "home.features.f2.body": "พิมพ์ <code>[[ลิงก์]]</code> ที่ไหนก็ได้ในโน้ต แล้วรับแบ็กลิงก์เชื่อมโยงกับทุกเนื้อหาในโปรเจกต์",

  "home.features.f3.title": "แผนที่ ไทม์ไลน์ และแคนวาส",
  "home.features.f3.body": "กราฟบทสนทนา พื้นที่วาดภาพและไดอะแกรม สร้างด้วย D3 และ Konva ที่ฝังมากับแอป จึงใช้งานได้แม้ปิดอินเทอร์เน็ต",

  "home.features.f4.title": "18 ภาษา 3 ธีม",
  "home.features.f4.body": "ภาษาไทยเป็นค่าเริ่มต้น พร้อมอังกฤษ ญี่ปุ่น เกาหลี จีน เวียดนาม อินโดนีเซีย และอีก 11 ภาษา — พร้อมธีมมิดไนท์ เดย์ไลท์ และมูนไลท์",

  "home.features.f5.title": "ออกแบบมาให้พกพาได้",
  "home.features.f5.body": "รุ่นพกพาเก็บข้อมูลไว้ข้างไฟล์โปรแกรม คัดลอกโฟลเดอร์ลงแฟลชไดรฟ์ โปรเจกต์ก็ติดไปด้วย",

  "home.features.f6.title": "สำรองข้อมูลไว้ในมือคุณ",
  "home.features.f6.body": "ส่งออกฐานข้อมูลทั้งหมด, Nexus เดียว หรือโมดูลย่อยหนึ่งต้นเป็นไฟล์ได้ สำรองขึ้น Google Drive (ตัวเลือกเสริม) ใช้สโคป <code>drive.appdata</code> และ OAuth client ของคุณเอง — ไม่ผ่านเซิร์ฟเวอร์ของ DraconDex",

  "home.modules.eyebrow": "ต้นไม้โมดูล v3",
  "home.modules.title": "15 ชนิดโมดูล ซ้อนกันได้ตามใจคุณ",
  "home.modules.lead": "แทนที่จะมีหน้าจอตายตัว DraconDex v3 ให้คุณปลูกต้นไม้โมดูลขึ้นมาเอง แต่ละโหนดเลือกได้หนึ่งใน 15 ชนิด ซึ่งเป็นตัวกำหนดว่าโมดูลนั้นทำอะไรได้บ้าง — เก็บเรคคอร์ด วาดแผนที่ ไล่ไทม์ไลน์ สเก็ตช์ภาพ หรือเขียนร้อยแก้ว",
  "home.modules.link": "อ่านบันทึกสถาปัตยกรรม →",
  "home.modules.shot.caption": "เชลล์ของแอป — ต้นไม้ Nexus, แท็บ และช่องค้นหา พร้อม classifier ที่เปิดอยู่",
  "home.modules.shot.figcaption": "เชลล์ของแอป — ต้นไม้ Nexus, แท็บ และช่องค้นหา พร้อม classifier ที่เปิดอยู่ คลิกเพื่อซูม",

  "home.modtrack.aria": "ภาพหน้าจอโมดูล — ลาก ใช้ปุ่มลูกศร หรือกดปุ่มลูกศรบนคีย์บอร์ดเพื่อเลื่อนดู คลิกภาพด้านหน้าเพื่อซูม",
  "home.modslider.prev": "เลื่อนไปภาพก่อนหน้า",
  "home.modslider.next": "เลื่อนไปภาพถัดไป",

  "home.mod.collector.body": "โฟลเดอร์เปล่า — จัดกลุ่มลูกๆ โดยไม่มีอะไรให้เปิดเอง แค่ขยายและยุบ",

  "home.mod.manager.caption": "Manager — แสดงลูกของโมดูล Major เป็นการ์ด ลิสต์ ตาราง หรือรายการล่าสุด",
  "home.mod.manager.body": "แสดงลูกของโมดูล Major เป็นการ์ด ลิสต์ ตาราง หรือรายการล่าสุด — ฮับเริ่มต้นของโมดูลที่มีลูก",

  "home.mod.inspector.caption": "Inspector — โน้ตยาวหนึ่งชิ้นที่ผูกกับฟิลด์คำอธิบายของโมดูล",
  "home.mod.inspector.body": "โน้ตยาวหนึ่งชิ้น: ตัวแก้ไข markdown ที่ผูกกับฟิลด์คำอธิบายของโมดูลเอง",

  "home.mod.classifier.caption": "Classifier — ชุดเรคคอร์ดที่มีชนิดกำกับ แสดงเป็นกริดการ์ดในภาพนี้",
  "home.mod.classifier.body": "ชุดเรคคอร์ดที่มีชนิดกำกับ ใช้เทมเพลตแอตทริบิวต์ร่วมกัน — แสดงเป็นตาราง, ลิสต์+รายละเอียด, กราฟความสัมพันธ์ หรือกริดการ์ด",

  "home.mod.locator.caption": "Locator — แคนวาสแผนที่ที่วาดพื้นที่รูปหลายเหลี่ยมและใส่ป้ายกำกับได้",
  "home.mod.locator.body": "แคนวาสแผนที่ที่คุณวาดพื้นที่รูปหลายเหลี่ยม ใส่ป้ายกำกับ และลิงก์ถึงได้",

  "home.mod.chronicler.caption": "Chronicler — ไทม์ไลน์เหตุการณ์ในโลกเรื่อง",
  "home.mod.chronicler.body": "ไทม์ไลน์เหตุการณ์ในโลกเรื่อง — แบบบรรทัดเดียว, ลิสต์แนวตั้ง หรือเทียบเคียงแบบเคียงข้างกัน",

  "home.mod.wanderer.caption": "Wanderer — ปักหมุดเหตุการณ์จาก Chronicler ลงบนแผนที่ Locator",
  "home.mod.wanderer.body": "ปักหมุดเหตุการณ์จาก Chronicler ลงบนแผนที่ Locator ให้คุณเลื่อนดูช่วงเวลาและเห็นว่าเหตุการณ์เกิดที่ไหน",

  "home.mod.narrator.caption": "Narrator — กราฟโหนดและเส้นเชื่อมสำหรับบทสนทนาแบบแตกกิ่ง",
  "home.mod.narrator.body": "กราฟโหนดและเส้นเชื่อมสำหรับบทสนทนาแบบแตกกิ่งและผังเส้นทาง",

  "home.mod.author.caption": "Author — สารบัญบทอยู่ด้านซ้าย เนื้อเรื่องเขียนในตัวแก้ไข markdown",
  "home.mod.author.body": "หนังสือหนึ่งเล่ม: สารบัญบทอยู่ด้านซ้าย เนื้อเรื่องเขียนในตัวแก้ไข markdown ด้านขวา",

  "home.mod.scribe.caption": "Scribe — โน้ตแชทประทับเวลา ผูกกับโมดูลเดียว",
  "home.mod.scribe.body": "โน้ตแชทประทับเวลา ผูกกับโมดูลเดียว — ไว้จดสั้นๆ ไม่ใช่สมุดโน้ตรวมทั้งแอป",

  "home.mod.drafter.caption": "Drafter — หน้ากระดาษ markdown เปล่าสำหรับไอเดียหลวมๆ",
  "home.mod.drafter.body": "หน้ากระดาษ markdown เปล่าสำหรับไอเดียหลวมๆ ที่ไม่ต้องมีแถวฐานข้อมูลของตัวเอง",

  "home.mod.viewer.caption": "Viewer — มุมมองอ่านอย่างเดียวของฟิลเตอร์ที่บันทึกไว้",
  "home.mod.viewer.body": "มุมมองอ่านอย่างเดียวของฟิลเตอร์ที่บันทึกไว้ — แบบตาราง, การ์ด หรือบอร์ดสไตล์คัมบัง",

  "home.mod.connector.caption": "Connector — กราฟความสัมพันธ์ที่สร้างจากฟิลเตอร์ที่บันทึกไว้",
  "home.mod.connector.body": "กราฟความสัมพันธ์ที่สร้างจากฟิลเตอร์ที่บันทึกไว้ — โหนดคือเรคคอร์ด เส้นเชื่อมคือความสัมพันธ์หรือวิกิลิงก์",

  "home.mod.sketcher.caption": "Sketcher — แคนวาสวาดภาพแบบมืออิสระ",
  "home.mod.sketcher.body": "แคนวาสวาดภาพแบบมืออิสระ — ปากกา ยางลบ หลายหน้า ส่งออกเป็น PNG ได้",

  "home.mod.designer.caption": "Designer — บอร์ดไดอะแกรมแบบอิสระ",
  "home.mod.designer.body": "บอร์ดไดอะแกรมแบบอิสระ — ลากรูปทรง เส้นเชื่อม และป้ายกำกับไปวางตามใจ",

  "home.plugins.eyebrow": "ปลั๊กอิน",
  "home.plugins.title.suffix": "ปลั๊กอินทางการ ติดตั้งจากลิงก์เดียว",
  "home.plugins.lead": "วางลิงก์ repository ไว้ที่ Settings → Plugins แล้ว DraconDex จะบอกให้ชัดเจนว่าจะดึงไฟล์ไหน สร้างตารางอะไร และคุยกับโฮสต์ใดบ้าง — จากนั้นรันปลั๊กอินในหน้าต่างแซนด์บ็อกซ์แยกต่างหากที่เข้าถึงข้อมูลหลักของคุณไม่ได้",
  "home.plugins.cta": "ปลั๊กอินทั้งหมด และวิธีสร้างปลั๊กอินของคุณเอง",

  "home.platforms.eyebrow": "แพลตฟอร์ม",
  "home.platforms.title": "รันบนอะไรได้บ้าง",
  "home.platforms.win.title": "เดสก์ท็อป Windows",
  "home.platforms.win.body": "แอปหลัก สร้างด้วย Electron แต่ละรีลีสมีให้เลือก 3 แบบ: ตัวติดตั้ง NSIS, ไฟล์พกพา <code>.exe</code> เดี่ยว และโฟลเดอร์พกพาแบบซิป",
  "home.platforms.win.link": "ดาวน์โหลด →",
  "home.platforms.android.pill": "กำลังพัฒนา",
  "home.platforms.android.body": "พอร์ต Flutter ใช้สคีมา SQLite เดียวกัน ย้ายฐานข้อมูลระหว่างเดสก์ท็อปกับมือถือได้ พัฒนาแยกกันและตอนนี้ฟีเจอร์ยังตามหลังเดสก์ท็อปอยู่",
  "home.platforms.android.link": "วิธีดาวน์โหลด APK →",

  "home.docs.eyebrow": "เอกสารประกอบ",
  "home.docs.title": "เอกสารอยู่ใน repository ของแอป",
  "home.docs.lead": "โปรเจกต์นี้มีเอกสารละเอียดที่อัปเดตต่อเนื่อง — เขียนเป็นภาษาไทย ซึ่งเป็นภาษาหลักของโปรเจกต์",
  "home.docs.architec": "สถาปัตยกรรมต้นไม้โมดูล v3 และแต่ละชนิดแมปกับไฟล์และช่องทาง IPC อย่างไร",
  "home.docs.systems": "แต่ละระบบทำงานอย่างไร — Director, Navigator, Hero, Writer, Scribe, Sage, Artisan, วิกิลิงก์, เชลล์แบบ IDE",
  "home.docs.plugins": "รันไทม์ของปลั๊กอิน: รูปแบบ manifest, แซนด์บ็อกซ์ และคำอธิบายตรงไปตรงมาว่ามันป้องกันอะไรได้และไม่ได้บ้าง",
  "home.docs.drive": "ตั้งค่าการสำรองข้อมูลขึ้น Google Drive (ตัวเลือกเสริม) ด้วย OAuth client ของคุณเอง",
  "home.docs.files": "รายการอ้างอิงรายไฟล์ว่าอะไรอยู่ตรงไหนในโค้ด",
  "home.docs.changelog": "มีอะไรเปลี่ยนแปลงและทำไม ในแต่ละเซสชัน",

  "home.cta.title": "เริ่มเขียนโลกของคุณ",
  "home.cta.body": "ไม่ต้องมีบัญชี ไม่ต้องสมัครสมาชิก ดาวน์โหลด รัน แล้วข้อมูลก็อยู่ตรงที่คุณเก็บมันไว้",
  "home.cta.download": "ดาวน์โหลด DraconDex",
  "home.cta.source": "ดูซอร์สโค้ด",

  "home.themes.eyebrow": "ธีม",
  "home.themes.title": "3 ธีมในตัว พร้อมพรีเซ็ตให้ต่อยอดธีมของคุณเอง",
  "home.themes.lead": "ภาพหน้าจอโมดูลด้านบนเป็นธีมมิดไนท์ ธีมเริ่มต้นของแอป ส่วนด้านล่างนี้คืออีกสองธีมในตัว — เดย์ไลท์และมูนไลท์ — พร้อมตัวอย่างพาเลตสีบางส่วนจากหน้าต่าง Custom Theme ในแอป แต่ละแบบเป็นจุดเริ่มต้นที่คัดลอก ปรับแต่ง แล้วบันทึกเป็นธีมของคุณเองได้",
  "home.themetrack.aria": "ภาพตัวอย่างธีม — ลาก ใช้ปุ่มลูกศร หรือกดปุ่มลูกศรบนคีย์บอร์ดเพื่อเลื่อนดู คลิกภาพด้านหน้าเพื่อซูม",

  "home.theme.daylight.caption": "Daylight — ธีมสว่างของแอป หนึ่งในสามธีมที่มีอยู่ในตัว",
  "home.theme.daylight.body": "สว่างและสะอาดตา — หนึ่งในสามธีมในตัวของ DraconDex คู่กับมิดไนท์และมูนไลท์",

  "home.theme.moonlight.caption": "Moonlight — ธีมโทนน้ำเงินเข้ม ธีมล่าสุดในสามธีมที่มีอยู่ในตัว",
  "home.theme.moonlight.body": "ทางเลือกโทนน้ำเงินเย็นกว่าธีมมิดไนท์ — ธีมล่าสุดในสามธีมในตัว",

  "home.theme.redeclipse.caption": "Red Eclipse — ตัวอย่างพาเลตจากหน้าต่าง Custom Theme โทนแดงอุ่นบนพื้นเกือบดำ",
  "home.theme.redeclipse.body": "ตัวอย่างพาเลตจากหน้าต่าง Custom Theme — โทนแดงอุ่นบนพื้นหลังเกือบดำ",

  "home.theme.clearsky.caption": "Clear Sky — ตัวอย่างพาเลตจากหน้าต่าง Custom Theme โทนฟ้าเย็นบนพื้นขาว",
  "home.theme.clearsky.body": "ตัวอย่างพาเลตจากหน้าต่าง Custom Theme — โทนฟ้าเย็นสดใสบนพื้นหลังสีขาว",

  "home.theme.atdusk.caption": "At Dusk — ตัวอย่างพาเลตจากหน้าต่าง Custom Theme โทนม่วงและไวโอเล็ต",
  "home.theme.atdusk.body": "ตัวอย่างพาเลตจากหน้าต่าง Custom Theme — โทนม่วงเข้มพร้อมสีเน้นไวโอเล็ต",

  "home.theme.clearaurora.caption": "Clear Aurora — ตัวอย่างพาเลตจากหน้าต่าง Custom Theme โทนเขียวอมฟ้าและม่วงแดง",
  "home.theme.clearaurora.body": "ตัวอย่างพาเลตจากหน้าต่าง Custom Theme — พื้นผิวโทนเขียวอมฟ้าพร้อมสีเน้นม่วงแดง",

  "home.theme.rainbow.caption": "Rainbow — ตัวอย่างพาเลตจากหน้าต่าง Custom Theme กรอบไล่สีรุ้งพร้อมปุ่มหลากสี",
  "home.theme.rainbow.body": "ตัวอย่างพาเลตจากหน้าต่าง Custom Theme — กรอบแอปไล่สีรุ้งพร้อมปุ่มและป้ายหลากสี",

  /* --- download.html -------------------------------------------------------- */
  "dl.meta.title": "ดาวน์โหลด DraconDex",
  "dl.meta.description": "ดาวน์โหลด DraconDex สำหรับ Windows — ตัวติดตั้ง NSIS, ไฟล์พกพา exe เดี่ยว หรือโฟลเดอร์พกพาแบบซิป ทุกรีลีสมาพร้อมเช็กซัม SHA-256",

  "dl.hero.eyebrow": "ดาวน์โหลด",
  "dl.hero.title": "ดาวน์โหลด DraconDex",
  "dl.hero.lead": "ฟรีและออฟไลน์ เลือกรูปแบบที่เหมาะกับคุณ — ทั้งสามแบบคือแอปตัวเดียวกัน ต่างกันแค่ว่าเก็บข้อมูลไว้ที่ไหนและต้องติดตั้งหรือไม่",
  "dl.hero.meta.latestRelease": "รีลีสล่าสุด",
  "dl.hero.meta.published": "เผยแพร่เมื่อ",
  "dl.hero.meta.notes": "อ่านบันทึกการอัปเดต",
  "dl.hero.loading": "กำลังโหลดรีลีสล่าสุดจาก GitHub…",
  "dl.hero.assetsNote": "ไฟล์รีลีสมีเฉพาะบิลด์ Windows บนระบบอื่นคุณยังรันแอปจากซอร์สโค้ดได้ — ดู <a href=\"https://github.com/LDKTC/App-DraconDex#getting-started-desktop--dev\">Getting started</a> ใน repository",

  "dl.which.eyebrow": "เลือกแบบไหนดี",
  "dl.which.title": "ตัวติดตั้ง, ไฟล์พกพา exe หรือโฟลเดอร์พกพา",
  "dl.which.th.build": "รูปแบบ",
  "dl.which.th.installs": "ต้องติดตั้งไหม?",
  "dl.which.th.datalives": "ข้อมูลของคุณอยู่ที่ไหน",
  "dl.which.th.bestfor": "เหมาะกับ",
  "dl.which.row1.installs": "ต้องติดตั้ง — เลือกโฟลเดอร์ ได้ shortcut ให้อัตโนมัติ",
  "dl.which.row1.datalives": "<code>%APPDATA%/DraconDex/</code> อยู่รอดแม้ถอนการติดตั้งหรืออัปเดต",
  "dl.which.row1.bestfor": "เครื่องส่วนตัวของคุณ ตัวเลือกปกติ",
  "dl.which.row2.installs": "ไม่ต้องติดตั้ง — ไฟล์เดียว รันได้เลย",
  "dl.which.row2.datalives": "<code>novel-manager-data</code> อยู่ข้างไฟล์ exe",
  "dl.which.row2.bestfor": "ลองใช้เร็วๆ หรือเครื่องที่ถูกจำกัดสิทธิ์",
  "dl.which.row3.installs": "ไม่ต้องติดตั้ง — แตกไฟล์แล้วรัน <code>DraconDex.exe</code>",
  "dl.which.row3.datalives": "<code>novel-manager-data</code> อยู่ในโฟลเดอร์",
  "dl.which.row3.bestfor": "แฟลชไดรฟ์ USB โปรเจกต์ทั้งหมดติดไปกับโฟลเดอร์",
  "dl.which.callout": "<strong>รุ่นพกพามีขนาดราว 200–220 MB</strong> เพราะเป็น Electron — แอปรวมเอนจินเบราว์เซอร์ไว้ในตัว จึงไม่ต้องติดตั้งรันไทม์เพิ่ม และไม่ต้องต่ออินเทอร์เน็ต",

  "dl.verify.eyebrow": "ตรวจสอบ",
  "dl.verify.title": "ตรวจสอบไฟล์ที่ดาวน์โหลดมา",
  "dl.verify.lead": "ทุกรีลีสมาพร้อม <code>checksums-sha256.txt</code> ครอบคลุมทั้งสามรุ่นของ Windows เทียบให้ตรงก่อนรันอะไรทั้งนั้น",
  "dl.verify.callout": "<strong>บิลด์เหล่านี้ไม่ได้เซ็นโค้ด (code-signed)</strong> Windows SmartScreen จะเตือนตอนรันครั้งแรก คำเตือนนี้เป็นเรื่องปกติสำหรับบิลด์โอเพนซอร์สที่ไม่ได้เซ็นโค้ด — การตรวจ SHA-256 ด้านบนคือการยืนยันตัวจริง",

  "dl.android.title": "พอร์ตสำหรับมือถือ",
  "dl.android.lead": "ฟรอนต์เอนด์ Flutter อยู่ใน <code>flutter/</code> ของ repository แอป ใช้สคีมา SQLite เดียวกับเดสก์ท็อป ย้ายฐานข้อมูลระหว่างสองฝั่งได้ — แต่พัฒนาแยกกันและตอนนี้ฟีเจอร์ยังตามหลังอยู่",
  "dl.android.actions.title": "จาก GitHub Actions",
  "dl.android.actions.body": "ไฟล์ APK ไม่ได้แนบไว้ในรีลีส ให้รันเวิร์กโฟลว์ <strong>Build Flutter APK</strong> ใน repository ของแอป แล้วดาวน์โหลด artifact ชื่อ <code>release-apks</code>",
  "dl.android.actions.link": "เปิดเวิร์กโฟลว์",
  "dl.android.build.title": "สร้างเองด้วยตัวเอง",
  "dl.android.build.body": "ต้องมี Flutter SDK 3.44.4 ขึ้นไป และ Android toolchain:",
  "dl.android.move": "ย้ายโปรเจกต์ข้ามเครื่อง: ส่งออก <code>novel-manager.db</code> จากโฟลเดอร์ข้อมูลของแอปเดสก์ท็อป คัดลอกไปที่มือถือ แล้วใช้ <strong>Settings → Import Database</strong> ในแอป Android",

  "dl.npm.eyebrow": "สำหรับนักพัฒนา",
  "dl.npm.title": "ซอร์สโค้ดในรูปแบบแพ็กเกจ",
  "dl.npm.lead": "แอปนี้เผยแพร่เป็น <code>@ldktc/dracondex</code> บน GitHub Packages ด้วย มันคือตัวแอปเอง ไม่ใช่ไลบรารี — ไม่มีอะไรให้ import ส่วนใหญ่แล้วคุณน่าจะต้องการตัวติดตั้งด้านบนมากกว่า",
  "dl.npm.tokenNote": "โทเคนต้องการแค่สโคป <code>read:packages</code> Electron เป็น dev dependency ดังนั้นการรันแอปจากการติดตั้งนี้ยังต้อง <code>npm install</code> ใน checkout แบบเต็มอยู่ดี",

  "dl.history.eyebrow": "ประวัติ",
  "dl.history.title": "รีลีสก่อนหน้า",
  "dl.history.loading": "กำลังโหลด…",
  "dl.history.link": "ดูรีลีสทั้งหมดบน GitHub →",

  /* --- plugins.html ---------------------------------------------------------- */
  "pg.meta.title": "ปลั๊กอิน DraconDex",
  "pg.meta.description": "ปลั๊กอินทางการทั้งหมดของ DraconDex — Claude Chat, Codex Chat, Ollama Chat และเทมเพลตปลั๊กอิน — พร้อมสิทธิ์ที่แต่ละตัวขอ วิธีติดตั้งจากลิงก์ และวิธีเขียนปลั๊กอินของคุณเอง",

  "pg.hero.title": "ต่อขยาย DraconDex ด้วยลิงก์เดียว",
  "pg.hero.lead": "ปลั๊กอินคือ git repository ที่มี manifest ของตัวเอง วางลิงก์ในแอป ดูว่ามันจะทำอะไรบ้าง แล้วกดยืนยัน แต่ละปลั๊กอินมีตารางฐานข้อมูลของตัวเองและรันในหน้าต่างแซนด์บ็อกซ์แยกต่างหาก — อ่านข้อมูลนิยายของคุณไม่ได้",

  "pg.install.eyebrow": "การติดตั้ง",
  "pg.install.title": "สี่ขั้นตอน หนึ่งลิงก์",
  "pg.install.requires": "ต้องใช้ DraconDex 4.2.0 ขึ้นไป",
  "pg.install.step1": "เปิด <strong>Settings → Plugins</strong> ในแอป DraconDex",
  "pg.install.step2": "<strong>วางลิงก์ repository</strong> ลงในช่องเดียว รองรับทั้งแบบ <code>owner/repo</code> เปล่าๆ, URL แบบ HTTPS, URL แบบ SSH หรือลิงก์ <code>/tree/&lt;branch&gt;</code> รองรับ GitHub และ GitLab เท่านั้น โฮสต์อื่นจะถูกปฏิเสธ",
  "pg.install.step3": "<strong>อ่านตัวอย่างก่อนติดตั้ง</strong> แอปจะดึง manifest มาแสดงชื่อและเวอร์ชันของปลั๊กอิน ไฟล์ทุกไฟล์ที่จะดาวน์โหลด ตารางทุกตารางที่จะสร้าง และโฮสต์ทุกแห่งที่อาจติดต่อ ขั้นตอนนี้ไม่แตะทั้งดิสก์และฐานข้อมูล",
  "pg.install.step4": "<strong>ยืนยัน</strong> ตัวติดตั้งจะตรวจสอบทุกอย่างใหม่ทั้งหมดตั้งแต่ต้น — ไม่เชื่อผลจากตัวอย่างก่อนหน้า — แล้วจึงเขียนไฟล์และสร้างตาราง",
  "pg.install.callout": "<strong>ปลั๊กอินคือโค้ดจากอินเทอร์เน็ต</strong> แซนด์บ็อกซ์กันไม่ให้ปลั๊กอินแตะข้อมูลนิยายของคุณหรือติดต่อโฮสต์ที่ไม่ได้ประกาศไว้ แต่มันทำให้ปลั๊กอินที่เขียนแย่หรือมุ่งร้ายปลอดภัยไม่ได้ แอปมี <a href=\"https://github.com/LDKTC/App-DraconDex/blob/main/docs/PLUGINS.md\">PLUGINS.md</a> ที่อธิบายตรงไปตรงมาว่าแซนด์บ็อกซ์ป้องกันอะไรได้และไม่ได้ — ควรอ่านก่อนติดตั้งอะไรก็ตามที่คุณไม่ได้เขียนเอง",

  "pg.official.eyebrow": "ปลั๊กอินทางการ",
  "pg.official.title.suffix": "ปลั๊กอิน เผยแพร่ภายใต้ github.com/LDKTC",
  "pg.official.lead": "เวอร์ชันและสิทธิ์ด้านล่างอ่านมาจาก <code>dracondex-plugin.json</code> สดของแต่ละ repository ตอนโหลดหน้านี้",
  "pg.official.credentials": "ปลั๊กอินแชททั้งสามตัวต้องใช้ credential ของตัวเอง — DraconDex ไม่แจก API key หรือพร็อกซีให้ และไม่มีเซิร์ฟเวอร์ของ DraconDex เข้ามาเกี่ยวข้อง Ollama เป็นตัวเลือกที่รันในเครื่องล้วนๆ — คุยกับโมเดลที่รันอยู่บนเครื่องของคุณเองเท่านั้น",

  "pg.sandbox.eyebrow": "แซนด์บ็อกซ์",
  "pg.sandbox.title": "ปลั๊กอินเข้าถึงอะไรได้และไม่ได้บ้าง",
  "pg.sandbox.can.title": "ทำได้",
  "pg.sandbox.can.li1": "อ่านและเขียนตาราง<em>ของตัวเอง</em>ผ่าน <code>window.pluginApi.table.*</code>",
  "pg.sandbox.can.li2": "เรียกโฮสต์ที่ประกาศไว้ใน <code>permissions.net</code> — เฉพาะ HTTPS เท่านั้น โดยตัด <code>Cookie</code>, <code>Host</code>, <code>Origin</code> และ <code>Referer</code> ออก และไม่มี cookie jar",
  "pg.sandbox.can.li3": "รับการตอบกลับแบบสตรีม และรันขั้นตอน OAuth 2.0 + PKCE ที่เปิดเบราว์เซอร์ของระบบ",
  "pg.sandbox.can.li4": "แสดงเป็นแผงที่ฝังในหน้าต่างหลัก และขอ <code>id</code>, <code>name</code> และ <code>kind</code> ของโมดูลที่เปิดอยู่ได้ ถ้าประกาศ <code>permissions.context</code> ไว้",
  "pg.sandbox.cannot.title": "ทำไม่ได้",
  "pg.sandbox.cannot.li1": "แตะ <code>window.api</code> — พื้นผิว IPC ของแอปหลักไม่ปรากฏอยู่ในหน้าต่างปลั๊กอินเลย",
  "pg.sandbox.cannot.li2": "อ่านตัวละคร โน้ต ไทม์ไลน์ หรือตารางอื่นใดของแอป",
  "pg.sandbox.cannot.li3": "ติดต่อโฮสต์ที่ไม่ได้ประกาศไว้, ลดระดับลงเป็น <code>http://</code> ธรรมดา (ยกเว้น loopback address ที่ระบุพอร์ตชัดเจน) หรือตามรีไดเรกต์ที่ออกนอก allowlist",
  "pg.sandbox.cannot.li4": "ขยายสิทธิ์ที่ขอไว้หลังติดตั้งแล้ว — ตัวติดตั้งตรวจสอบ manifest ใหม่ทุกครั้งและไม่สนใจผลตัวอย่างก่อนหน้า",
  "pg.sandbox.note": "หน้าต่างปลั๊กอินรันด้วย <code>contextIsolation: true</code>, <code>nodeIntegration: false</code> และ <code>sandbox: true</code> ชื่อของตารางและคอลัมน์จาก manifest ถูกตรวจกับ regex whitelist อย่างเข้มงวดก่อนถูกประกอบเป็น SQL ทุกครั้ง — ไม่มีชื่อจากปลั๊กอินตัวไหนเข้าถึงฐานข้อมูลโดยไม่ผ่านการตรวจสอบ",

  "pg.build.eyebrow": "สร้างปลั๊กอินของคุณเอง",
  "pg.build.title": "ปลั๊กอินคือไฟล์ JSON หนึ่งไฟล์กับ HTML อีกนิดหน่อย",
  "pg.build.lead": "วาง <code>dracondex-plugin.json</code> ไว้ที่รากของ public repository แล้ว fork <a href=\"https://github.com/LDKTC/DraconDex-Plugin-Template\">DraconDex-Plugin-Template</a> เพื่อข้ามงานเซ็ตอัพซ้ำๆ",
  "pg.build.limits.title": "ขีดจำกัด",
  "pg.build.limits.th.field": "ฟิลด์",
  "pg.build.limits.th.rule": "กติกา",
  "pg.build.limits.id": "ตัวพิมพ์เล็ก <code>a–z</code>, <code>0–9</code> และ <code>_</code>; ยาวไม่เกิน 20 ตัวอักษร",
  "pg.build.limits.entry": "ต้องเป็นไฟล์ HTML และต้องอยู่ใน <code>files</code> ด้วย",
  "pg.build.limits.files": "ได้สูงสุด 30 ไฟล์ ไฟล์ละไม่เกิน 2 MB แอปจะดึงเฉพาะไฟล์เหล่านี้เท่านั้น — ไม่เดินสำรวจ repository เอง",
  "pg.build.limits.tables": "ได้สูงสุด 10 ตาราง ตารางละไม่เกิน 25 คอลัมน์ ชนิดคอลัมน์มีแค่ <code>TEXT</code>, <code>INTEGER</code> หรือ <code>REAL</code> — ไม่มีค่าเริ่มต้น, check หรือ foreign key",
  "pg.build.limits.panels": "ได้สูงสุด 5 แผง แต่ละแผงต้องมี id ไม่ซ้ำกัน ชื่อยาวไม่เกิน 40 ตัวอักษร และ <code>entry</code> ที่อยู่ใน <code>files</code>",
  "pg.build.limits.net": "ได้สูงสุด 10 origin แบบ <code>https://</code> เปล่าๆ — ไม่มี path, query หรือ credential ข้อยกเว้นเดียวคือ loopback address ที่ระบุพอร์ตชัดเจน เช่น <code>http://localhost:11434</code>",
  "pg.build.limits.context": "ตอนนี้มีแค่ <code>\"module\"</code> — รู้แค่ตัวตนของโมดูลที่เปิดอยู่ ไม่ใช่เนื้อหาข้างใน",
  "pg.build.callout": "<strong>แผงจะถูกโหลดใหม่เสมอ</strong> แผงที่ฝังอยู่จะเรนเดอร์ใหม่ทุกครั้งที่หน้าต่างหลักเรนเดอร์ใหม่ ดังนั้นเก็บ state ไว้ในตารางของตัวเองแล้วโหลดกลับมาใหม่ — อย่าเก็บไว้ในตัวแปรธรรมดา",
  "pg.build.linkdocs": "อ่านเอกสารปลั๊กอินฉบับเต็ม",
  "pg.build.linktemplate": "เริ่มจากเทมเพลต",
};
