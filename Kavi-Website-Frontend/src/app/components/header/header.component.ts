import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  HostListener, Inject
} from '@angular/core';
import { cloneDeep } from 'lodash';
import { Router, ActivatedRoute,  NavigationStart, NavigationEnd } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { DOCUMENT} from '@angular/common';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RightMenuService } from 'src/app/views/right-menu/right-menu.service';
import { HomeComponent} from 'src/app/views/home/home.component';
//import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() logoImage: string = '';

  public menuData: any = [];
  public isDataLoaded: boolean = false;
  public leftMenuCardOne: any = [];
  public leftMenuCardTwo: any = [];
  public keyList: any = [];
  public OfferingList: any = [];
  public searchTagValue: any = [];
  public showMenu: boolean = false;
  public isScroll: boolean = false;
  private getMenuItem: Subscription | undefined;
  public isSubscribed:  boolean = false;
  constructor(
    public router: Router,
    public commonService: CommonService,
    public rightMenuService: RightMenuService, 
    public modalService: NgbModal,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
//    this.router.routeReuseStrategy.shouldReuseRoute = () => false; 
    this.document.body.classList.remove('hide-scroll');
    this.getMenuItem = this.commonService.getMenuItem.subscribe((menuItem: any) => {     
      this.makeMenuList();
    });
//    this.router.navigate(['/blogs']);

  }
  ngOnDestroy(): void {
    if (this.getMenuItem) {
      this.getMenuItem.unsubscribe();
    }
  }

  @HostListener('window:scroll', ['$event'])
  doSomething(event: any) {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    if (pos > document.documentElement.offsetHeight) {
      this.isScroll = true;
    }
    else {
      this.isScroll = false;
    }
  }

  public makeMenuList() {
//    console.log("menulist",this.commonService.menuData);
//    this.menuData = cloneDeep(this.commonService.menuData);
      this.menuData = cloneDeep(this.commonService.menuData);
/*    this.menuData={
      "data": {
        "id": 1,
        "attributes": {
          "createdAt": "2023-02-13T15:50:33.378Z",
          "updatedAt": "2023-05-24T23:56:14.016Z",
          "publishedAt": "2023-03-20T16:18:19.280Z",
          "LeftMenu": [
            {
              "id": 1,
              "Styles": "Orange",
              "Card": "Card1",
              "Label": "About Us",
              "Title": "About Us",
              "DisplayOrder": 1,
              "offerings": {
                "data": [
                  
                ]
              },
              "aboutKavi": {
                "data": [
                  {
                    "id": 1,
                    "attributes": {
                      "createdAt": "2023-05-11T19:46:42.699Z",
                      "updatedAt": "2023-05-15T15:28:15.007Z",
                      "publishedAt": "2023-05-11T19:46:42.699Z",
                      "FullContent": "##### Mental Health Crisis\n\nThe field of mental health has long been associated with stigma, lack of access, and inadequate care. In recent years, Artificial Intelligence (AI) has emerged as a powerful tool to address these challenges and to improve the quality of care. Hospitals are uniquely positioned to take advantage of AI to provide better mental health care to their patients, providers, and the general public. In this blog post, we will explore the clinical opportunities and business benefits for Hospitals to address mental health issues using AI.\n\nThe mental health crisis in the United States has been exacerbated by the COVID-19 pandemic. According to the National Institute of Mental Health, one in five adults in the US experiences mental illness in any given year. In addition, the pandemic has led to increased stress, anxiety, and depression, which has further strained the mental health care system.\n\n##### Provider Mental Health Plummets Post COVID-19\n\nNurses and Doctors have been at the forefront of the fight against COVID-19, working long hours in high-stress environments. As a result, many nurses have experienced mental health issues, including anxiety, depression, and post-traumatic stress disorder (PTSD). \n\n#### AI can help individuals suffering from mental health issues in several ways\n\n##### 1. Early detection and intervention. \nAI can analyze data from patients electronic health records (EHRs) and other sources to identify those who may be at risk of developing mental health issues. This can allow for early intervention and treatment, which can improve outcomes.\n\n#####  2. Personalized treatment plans. \n\nAI can analyze data from patients to develop personalized treatment plans based on individual characteristics, such as medical history and lifestyle factors. This can ensure that nurses receive the most effective treatment for their specific needs.\n\n##### 3. Chatbots and virtual assistants. \n\nAI-powered chatbots and virtual assistants can provide nurses with 24/7 access to mental health support. They can use these services to schedule appointments, ask questions, and receive guidance on managing their mental health.\n\n##### 4. Telehealth services. \n\nAI-powered telehealth services can allow patients and nurses to receive mental health care from the comfort of their own homes. This can reduce the stigma associated with seeking mental health care and increase access to care for those who may be hesitant to seek help in person.\n\n##### 5. Monitoring and tracking. \n\nAI can monitor and track patents and nurses mental health symptoms over time. This can allow for early detection of changes in mental health status and adjustments to treatment plans as needed.\n\n##### AI Must be Overseen by a Therapist-in-the-Loop. \n\nIt's important to note that AI should be used in conjunction with traditional mental health care approaches, such as therapy and medication. AI is not a substitute for human interaction and support, but rather a tool to supplement and enhance the care that individuals receive. By leveraging AI in this way, hospitals and healthcare systems can better support the mental health needs of their nurses, improving outcomes for both nurses and patients, as well as patients directly.\n</br>\n\n![2](https://www.kaviglobal.com/wp-content/uploads/2023/04/Tiny-man-chatting-online-with-AI-assistant-scaled.jpg \"2\")\n</br>\n\n#### Emerging Technology Powered by AI:\n\n##### 1. Chatbot Therapists. \n\nChatbots can provide a convenient and accessible way for patients and nurses to receive support and guidance for their mental health concerns, especially during times when in-person therapy may not be readily available. These chatbots can use natural language processing to understand and respond to messages, providing personalized support and assistance in a way that feels like a conversation with a human therapist. Patients can request a live therapist at any time, or the tool can simply be used to bridge the gap between telehealth waiting times before the human therapist comes onto the appointment.\n\n##### 2. Intelligent Mobile Applications with Personalized Recommendations. \n\nMachine learning algorithms to analyze nurses speech patterns and identify signs of stress or anxiety. The application could then provide personalized recommendations and exercises to help reduce those symptoms via push notifications.\n\n#### Critical Considerations When Developing AI Therapists:\n\n##### 1. Integration with EHR. \n\nAI can integrate with EHR systems to provide providers with real-time data on patient health. This can help providers to make more informed decisions and deliver better care. Integration with EHR is also important when it comes to providing patients with the best possible mental health care. AI can analyze data from nurses EHRs to provide personalized treatment plans based on individual characteristics, such as medical history and lifestyle factors. This can ensure that nurses receive the most effective treatment for their specific needs.\n\n##### 2. Patient Data Privacy. \n\nAI can help to protect patient privacy by ensuring that sensitive PHI and PII information is stored securely and only accessed by authorized personnel. Patient privacy is a crucial consideration when it comes to using AI for mental health care. Hospitals and healthcare systems need to ensure that any AI-based tools and services they offer are secure and comply with applicable privacy regulations. This includes implementing appropriate data encryption and access controls to protect sensitive patient information. It also means being transparent about how patient data is being used and ensuring that patients have control over their own data.\n\n#### Hospitals Leverage AI to Address Mental Health Issues & Improve Patient Outcomes.\n\nCreating AI therapists would not only benefit the patients, but also have a positive impact on the hospitals business:\n\n##### 1. Improved patient outcomes. \n\nAI can help providers to identify patients who are at risk of developing mental health problems and intervene early. It can also assist providers in making more accurate diagnoses and developing personalized treatment plans.\n\n##### 2. Increased efficiency. \n\nAI can automate routine tasks, such as scheduling appointments and sending reminders, allowing providers to focus on delivering high-quality care.\n\n##### 3. Cost savings. \n\nAI can reduce the burden on providers, allowing them to see more patients in less time. This can result in cost savings for the hospital.\n\n##### 4. Competitive advantage. \n\nBy leveraging AI, Hospitals can differentiate itself from other providers in the region and attract patients who are seeking high-quality, technology-enabled care.\n\nIn summary, AI-powered chatbots, mobile apps, and personalized treatment plans can all be effective tools for supporting the mental health needs of providers and patients. Integration with EHR and patient privacy protections are also crucial considerations in implementing these tools in a healthcare setting. By leveraging these AI-based tools and services, hospitals and healthcare systems can improve the mental health outcomes for their nurses, leading to better outcomes for both nurses and patients, as well as provide care to the general public who may not be able to, or want to, come in.\n\n###### Looking to accelerate your Healthcare Mental Health Services Digital Transformation?\n\nEmail **Contact@KaviGlobal.com** to accelerate your transformation today!\n\n###### Take Care of Your Mental Health!\n\n</br>\n\n![3](https://www.kaviglobal.com/wp-content/uploads/2023/04/11098-scaled.jpg \"3\")",
                      "DisplayOrder": 3,
                      "ContentLink": "null",
                      "Name": "What We Do",
                      "Label": "What We Do",
                      "Slug": null,
                      "leadershipTeams": {
                        "data": [
                          
                        ]
                      }
                    }
                  },
                  {
                    "id": 2,
                    "attributes": {
                      "createdAt": "2023-05-11T19:46:42.699Z",
                      "updatedAt": "2023-05-15T15:28:15.028Z",
                      "publishedAt": "2023-05-11T19:46:42.699Z",
                      "FullContent": "#### Business Value of Healthcare Device Manufacturing Digital Transformation.\n\nmedical device manufacturing industry is witnessing an era of digital transformation, where the integration of emerging technologies such as Artificial Intelligence (AI) and Internet of Things (IoT) is revolutionizing the manufacturing landscape. Digital transformation is essential for medical device manufacturers to remain competitive, compliant, and innovative in an increasingly complex and rapidly changing market. By prioritizing their digital transformation now, manufacturers can gain a competitive advantage and deliver better outcomes for patients.\n\n##### 1. Improved Patient Outcomes: \n\nDigital transformation can also help medical device manufacturers improve patient outcomes. By leveraging emerging technologies like wearables and remote monitoring devices, manufacturers can develop products that can help patients manage their health conditions more effectively.\n\n##### 2. Improved Productivity & Operational Efficiency: \n\nThe integration of IoT can help manufacturers optimize their operations by providing real-time data on equipment performance and efficiency. This can help identify areas for improvement and streamline the manufacturing process, ultimately improving operational efficiency and reducing costs. The use of analytics and machine learning algorithms can help manufacturers identify patterns and insights that may not be visible to the human eye. This can help optimize production processes, reduce waste, and enhance overall productivity.\n\n##### 3. Better Quality Control:\n\nWith digital transformation, manufacturers can collect and analyze data on product quality, enabling them to identify issues early and take corrective action to improve the quality of their products.\n\n##### 4. Regulatory Compliance: \n\nThe medical device industry is highly regulated, and digital transformation can help manufacturers comply with these regulations. By implementing digital systems to track and monitor the production process, manufacturers can ensure that their products meet the necessary regulatory requirements.\n\n##### 5. Increased Innovation: \n\nDigital transformation can also enable medical device manufacturers to innovate more quickly and effectively. By using digital systems to collect and analyze data, manufacturers can identify new opportunities for product development and gain insights into customer needs and preferences.\n\n##### 6. Competitive Advantage: \n\nDigital transformation can give medical device manufacturers a competitive advantage by improving operational efficiency, enhancing product quality, and optimizing their supply chain. By leveraging the latest emerging technologies like AIoT, manufacturers can create intelligent, automated systems that can improve performance and reduce costs.\n</br>\n\n![1](https://images.prismic.io//intuzwebsite/5b53bf45-9093-4508-9cd6-81e057dd9b4c_AIoT+Banner.png?w=1200&q=75&auto=format,compress&fm=png8 \"1\")\n\n</br>\n\n#### Emerging Technology:AI + IoT = AIoT. \n\nAIoT stands for Artificial Intelligence of Things. It refers to the integration of artificial intelligence (AI) technologies with the Internet of Things (IoT) devices or Industrial Internet of Things (IIoT), such as sensors, smart appliances, and other connected devices. AIoT combines the power of AI algorithms with the data collected from IoT devices to create intelligent systems that can automate processes, make predictions, and optimize performance in real-time. For example, AIoT can be used to monitor and control environmental conditions in a manufacturing facility.\n\nBy using AI algorithms to analyze data from IoT devices, AIoT systems can identify patterns and insights that would be difficult or impossible for humans to detect. This can lead to improved efficiency, reduced costs, and enhanced user experiences in a wide range of industries. AIoT represents the next evolution of IoT technology, combining the power of AI with the vast amounts of data generated by IoT devices to create intelligent, automated systems that can improve performance and optimize operations.\n\n</br>\n\n![1](https://www.controleng.com/wp-content/uploads/sites/2/2021/12/CTL2111_WEB_SmartFactory-Yash-Image-Slider.jpg \"1\")\n\n</br>\n\n##### AIoT Use Cases. \n\nIoT technology offers numerous opportunities for medical device manufacturers to improve their operational efficiency, enhance product quality, and optimize their supply chain. By leveraging IoT technology, manufacturers can gain a competitive edge in an increasingly complex and competitive market.\n\n##### 1. Asset Tracking: \n\nIoT devices can be used to track the movement of medical device components and equipment throughout the manufacturing process, from assembly to shipping. This data can be analyzed to optimize production processes and reduce waste.\n\n##### 2. Remote Equipment Monitoring & Predictive Maintenance: \n\nBy using sensors and other IoT devices, medical device manufacturers can remotely monitor equipment and detect potential malfunctions before they occur. This data can be analyzed using predictive maintenance algorithms to schedule repairs before equipment failure. This can help manufacturers schedule maintenance activities and prevent equipment breakdowns, improving operational efficiency and reducing downtime.\n\n##### 3. Quality Control: \n\nBy using IoT devices to monitor and collect data on the production process, manufacturers can ensure that products meet the desired quality standards. By analyzing this data, manufacturers can identify patterns and insights that can be used to optimize the production process and improve product quality.\n\n##### 4. Supply Chain Optimization: \n\nIoT devices can be used to track the movement of materials and components throughout the supply chain, from raw materials to finished products. This data can be analyzed to optimize inventory levels, reduce waste, and improve supply chain efficiency.\n\n##### 5. Real-Time Production Monitoring: \n\nBy using IoT devices to monitor the production process in real-time, manufacturers can identify potential bottlenecks or issues that may impact production. This data can be analyzed to optimize production processes and reduce downtime.\n\n##### Looking to accelerate your Healthcare Medical Device Manufacturing Digital Transformation?\n\nIf you're a medical device manufacturing company looking to accelerate your digital transformation journey with the latest emerging technology, we can help. Our team of experts can help you develop a digital transformation strategy that aligns with your business goals and objectives. We can help you implement AIoT technology to improve operational efficiency, enhance productivity, and deliver a better customer experience. Contact us today to learn more about how we can help you accelerate your digital transformation journey.\n\nEmail **Contact@KaviGlobal.com** to accelerate your transformation today!",
                      "DisplayOrder": 2,
                      "ContentLink": "null",
                      "Name": "Our Story",
                      "Label": "Our Story",
                      "Slug": null,
                      "leadershipTeams": {
                        "data": [
                          
                        ]
                      }
                    }
                  },
                  {
                    "id": 3,
                    "attributes": {
                      "createdAt": "2023-05-11T19:46:42.699Z",
                      "updatedAt": "2023-05-15T15:28:15.043Z",
                      "publishedAt": "2023-05-11T19:46:42.699Z",
                      "FullContent": "#### Healthcare Digital Transformation Business & Clinical Outcomes\n\nThe healthcare industry has undergone a significant transformation over the past decade, with the integration of digital technology into its processes and services. This digital transformation has helped the industry become more efficient, effective, and patient-centric. In this blog, we will explore the business value of healthcare digital transformation, analytical use cases and outcomes.\n\n##### 1. Improved patient outcomes: \n\nDigital transformation can help hospitals to improve patient outcomes by enabling them to deliver more personalized, timely, and effective care. By leveraging emerging technologies such as wearables, AI, and IoMT, hospitals can collect and analyze patient data in real-time, allowing them to make better-informed decisions about patient care. Digital technologies, such as electronic health records (EHRs), telemedicine, and patient portals, can help healthcare providers deliver better patient care, improve patient safety, and reduce medical errors.\n\n##### 2. Enhanced patient experiences: \n\nDigital transformation can also help hospitals to enhance the overall patient experience by providing patients with more convenient and accessible care options. For example, telehealth services can enable patients to receive care from the comfort of their own homes, reducing the need for hospital visits and improving access to care for patients in remote locations. Digital technologies can help patients take an active role in their healthcare, by enabling them to access their health information, schedule appointments, and communicate with their healthcare providers online. This improves patient engagement and satisfaction.\n\n##### 3. Increased efficiency and productivity: \n\nBy digitizing their operations, hospitals can streamline their workflows and automate many of their administrative tasks. This can help to increase efficiency and productivity, allowing staff to focus more on patient care and reducing the risk of errors.\n\n##### 4. Competitive advantage:\n\nHospitals that embrace digital transformation will have a significant competitive advantage over those that do not. As patients become more tech-savvy and demand more personalized and accessible care, hospitals that can meet these needs will be better positioned to attract and retain patients. Digital technologies can facilitate data sharing between healthcare providers, enabling them to make more informed decisions about patient care. This can help improve care coordination, reduce duplication of services, and enhance the overall quality of care.\n\n##### 5. Cost savings: \n\nDigital transformation can also help hospitals to achieve cost savings by reducing the need for manual labor and streamlining their operations. This can help to reduce the overall cost of healthcare and make it more affordable for patients.\n\n![1](https://img.freepik.com/free-vector/telemedicine-isometric-concept-with-online-consultation-medical-mobile-apps-devices-isolated_1284-29415.jpg \"1\")\n\n#### Analytical Use Cases and Outcomes. \n\nHealthcare providers can leverage analytical tools to extract insights from patient data, improve decision-making, and optimize patient care. High impact use cases and outcomes include:\n\n##### 1. Predictive Analytics:\n\nPredictive analytics can help healthcare providers identify patients who are at risk of developing certain conditions, such as diabetes or heart disease. This can help providers develop targeted interventions to prevent or delay the onset of these conditions.\n\n##### 2. Clinical Decision Support: \n\nClinical decision support tools can help healthcare providers make more informed decisions about patient care, by providing real-time access to patient data, evidence-based guidelines, and best practices.\n\n##### 3. Population Health Management: \n\nPopulation health management tools can help healthcare providers monitor the health of their patient populations, identify trends and patterns, and develop targeted interventions to improve outcomes.\n\n##### 4. Patient Engagement: \n\nAnalytical tools can help healthcare providers understand patient preferences, behaviors, and needs, enabling them to develop personalized care plans and interventions.\n\n</br>\n![1](https://img.freepik.com/free-vector/digital-health-technologies-flat-composition_98292-7362.jpg \"1\")\n</br>\n\n#### Emerging Technology. \n\nThe healthcare industry is witnessing an era of digital transformation, where the integration of emerging technologies such as wearables, Artificial Intelligence (AI), and Internet of Medical Things (IoMT) is revolutionizing the healthcare landscape.\n\n##### 1. Wearables. \n\nWearables are a popular technology that can collect data on an individuals health and wellness. They can track vital signs such as heart rate, blood pressure, and sleep patterns, which can provide valuable insights into patient health. Wearables can also help patients to monitor and manage their health proactively. Wearable data can be analyzed to identify patterns and trends that can help healthcare providers personalize care and tailor interventions to meet the unique needs of each patient. Wearables can also help providers to monitor patients remotely, reducing hospital visits, and improving access to care for patients in remote locations.\n\n##### 2. AI. \n\nAI is another technology that has immense potential to transform healthcare. AI algorithms can analyze large volumes of patient data, including electronic health records, imaging, and laboratory test results. This can help healthcare providers to identify patterns and insights that may not be visible to the human eye. AI can also help providers to develop personalized treatment plans based on the patients individual needs and health status. AI-powered chatbots and virtual assistants can provide patients with real-time assistance and support, improving the overall patient experience.\n\n##### 3. Internet of Medical Things (IoMT). \n\nIoMT technology refers to the interconnected devices that collect data on patient health and wellness. IoMT devices can be used to monitor vital signs, track medication adherence, and monitor patient activity. This data can be analyzed to identify patterns and trends that can help healthcare providers develop personalized care plans and targeted interventions. IoMT technology can also be used to monitor patients remotely, reducing the need for hospital visits and improving access to care for patients in remote locations.\n\n#### Why is Healthcare Digital Transformation Critical Now? \n\nHospitals that act now to embrace digital transformation will be better positioned to deliver more personalized, accessible, and effective care to their patients. They will also have a significant competitive advantage over those that do not and will be better equipped to navigate the evolving healthcare landscape.\n\n#### Looking to accelerate your Healthcare Digital Transformation? \n\nIf you're a healthcare provider looking to accelerate your digital transformation journey with the latest emerging technology, we can help. Our team of experts can help you develop a digital transformation strategy that aligns with your business goals and objectives. We can help you implement wearables, AI, and IoMT technology to improve patient care and outcomes. Contact us today to learn more about how we can help you accelerate your digital transformation journey.\n\nEmail **Contact@KaviGlobal.com** to accelerate your transformation today!",
                      "DisplayOrder": 3,
                      "ContentLink": "null",
                      "Name": "Our Leadership Team",
                      "Label": "Our Leadership Team",
                      "Slug": null,
                      "leadershipTeams": {
                        "data": [
                          
                        ]
                      }
                    }
                  },
                  {
                    "id": 4,
                    "attributes": {
                      "createdAt": "2023-05-11T19:46:42.699Z",
                      "updatedAt": "2023-05-15T15:28:15.057Z",
                      "publishedAt": "2023-05-11T19:46:42.699Z",
                      "FullContent": "#### Enterprise Data Platform: Every CDO's Priority\n\nData Fabric. Digital Thread. Data Mesh. Golden Record of Truth. Whatever you call it, a harmonized and usable enterprise data layer is an essential facet of digital transformation.\n\nData fabric facilitates data access across the enterprise in a unified manner with ability to scale. It is not just a matter of automating workflows and processes but also a question of how we bring together legacy and other siloed data systems, to interact with one another and make a unified data platform. It is  with an integrated set of technologies and services, designed to deliver integrated and enriched data  at the right time, in the right method, and to the right data consumer  in support of both operational and analytical workloads.\n</br>\n\n![1](https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/KG_1_e56712fcc8.png \"1\")\n</br>\n\nData fabric combines key data management technologies  such as data ingestion, integration & transformation, governance, orchestration, and data catalog. Aligning with a domain-driven design, data fabric will be simply consumed by the business via data catalog.\n\n#### Data Fabric Business Benefits By Persona\n\n##### Business View\n\n- Self-service data on demand without having to write a single line of code delights business users\n\n- Reduced time to insights and data driven support to make more informed decisions when using the unified Data platform.\n\n##### IT View\n\n- Improved Quality with less tedious and repetitive data loads to perform cleansing and enhancement tasks to implement business rules and data quality rules.\n\n- Lower total cost of ownership and increased productivity, thanks to technology agnostic tools that upgrade at the click of a button, self document, and eliminate the need to retrain resources on each new underlying technology as the organization adopts it.\n\n##### Enterprise View\n\n- Enabling enterprise-wide data consumption  including data integration, data visualization, real time streaming data, and APIs for applications\n\n- Improves the collaboration between the business teams, and drives efficiency and productivity in engaging with IT teams.\n\n##### How to Tackle Today's Enterprise Data Fabric Challenges & Risks\n\nAs organizations seek to leverage their data, they encounter challenges resulting from disparate and legacy data sources, types, structured and unstructured data, data volume, and data quality. Code intensive platforms require deep technical skill sets and high maintenance. IT teams get caught in an endless loop of training, migrations and updates, and re-training, as they attempt to keep pace with the ever evolving technology stack, taking time away from creating business value.\n\nThis multi-dimensional data is further complicated when organizations adopt hybrid and multi-cloud architectures. For many enterprises today, operational data largely remains siloed and hidden, leading to an enormous amount of untapped business insights.\n\nThus, technology agnostic and no code solutions that encompass the entire data engineering, data science, and DataOps and analytics lifecycle- like -Advana  are recommended.\n</br>\n\n![1](https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/KG_2_90f878720c.jpg \"1\")\n</br>\n\n#### Top 3 Data Platform Features\n\nCritical, non-negotiable features of an enterprise data platform include centralized and automated data governance that is abstracted away from the code in a metadata layer, hundreds of common data transformations out of the box, and drag and drop analytical models to embed into data pipelines.\n\n**1. Data Governance**-  Data quality rules and business rules are managed centrally, and referenced in pipelines, for single point of updation and ensure updation across the business. Master metadata management to consolidate and standardize data with common definitions and hierarchies to standardize reporting across the business and ensure there is summary data for enterprise defined KPIs all the way down to detailed transactional data.\n\n**2. Data Engineering** - Data ingestion of structured and unstructured data files of various formats from on prem and cloud storage locations. Out of the box data engineering capabilities like change data capture. Continuous data integration and delivery acceleration through DataOps.\n\n**3. Data Science**-  ML and AI models predictive and prescriptive models can add value to data by answering specific business questions.\n\n#### Data Fabric Consumption\n\nData only delivers business value when it is contextualized and becomes accessible by any user or application in the organization. When implemented correctly, a data fabric helps ensure those values are available throughout the organization in the most efficient and automated way possible.\n\n**1. Data Catalog**-  Centralized, golden record of data, the single source of truth for enterprise data consumption, serving as a data dictionary to enable efficient access and reuse of data from business, and easy access to view metadata via data catalog.\n\n**2. Data as a Service**-  Inside the data fabric, microservices help applications achieve the task of connecting to particular data subject areas in the data fabric. APIs are available for IT teams to connect to and consume data from.\n\n**3 Analytics Catalog**-  Repository of all analytical models to enable reuse and accelerated insights by enabling ML mode sharing across the organization.\n\n**4. Intelligent Apps** - Applications with embedded AI to provide timely insights into business operational workflows to get the right insights, at the right time, to the right user, who can use the information to make a fast better decision.\n\n#### About the Author\n![img](https://www.kaviglobal.com/wp-content/uploads/2022/03/blog14.png)\n</br>\n\n**Jia Gao**\n\nJia Gao is a Business Analytics Consultant at Kavi Global. She has a Masters degree in Financial Risk Management from University of Connecticut and a Bachelor of Science degree in Applied Chemistry from Northeastern University. She is proficient in feature engineering, data modeling and machine learning. Jia enjoys yoga and traveling.",
                      "DisplayOrder": 4,
                      "ContentLink": "null",
                      "Name": "Why Kavi Global",
                      "Label": "Why Kavi Global",
                      "Slug": null,
                      "leadershipTeams": {
                        "data": [
                          
                        ]
                      }
                    }
                  },
                  {
                    "id": 5,
                    "attributes": {
                      "createdAt": "2023-05-11T19:46:42.699Z",
                      "updatedAt": "2023-05-15T15:28:15.073Z",
                      "publishedAt": "2023-05-11T19:46:42.699Z",
                      "FullContent": "#### Augmented Reality Creates Business Values\n\nRecent technological advancements have made it possible to seamlessly overlay computer-generated virtual images onto real- world objects. This is done in such a way that the virtual content can be viewed and interacted with in real-time. Known as **Augmented Reality (AR)**, this technology has a variety of uses across different industries. The computer-generated images are essentially the result of data analytics, and AR technology is believed to have a profound impact on people’s daily lives in the future. Beyond the entertainment game Pokémon Go, AR is being applied in far more consequential ways—in both consumer and business-to-business settings. According to one estimate, **the number of mobile AR users is expected to reach over 800 million and is forecasted to grow to 1.73B** by 2024.\n\nAR powerfully magnifies the value created by visualization, instruction/guidance, and interaction. To be specific, it improves how people visualize and perceive the new monitored data, how they receive and follow instructions on operations, and how they interact with the products. **AR promotes business values by transforming its key capabilities into product attributes, performance enhancements, and decision enhancements,** as demonstrated in the examples below.\n\n#### Intelligent AR COVID-19 Social Distancing App in Healthcare\n![blog2](https://www.kaviglobal.com/wp-content/uploads/2022/03/blog2.png \"blog2\")\n###### Picture Source – sodar.withgoogle.com\n\nThe COVID-19 virus has spread extensively to the entire world and has caused a significant number of deaths in recent three years. A great number of measures have been taken to curb the spread of the virus, including AR-driven applications. For example, a Google-developed Sodar application **enables smartphone users to be alerted if a person is closer than the mandated distance from one another.**\n\n#### Intelligent AR Asset Manufacturing and Repair Support App in Manufacturing\n\n![blog3](https://www.kaviglobal.com/wp-content/uploads/2022/03/blog3.png \"blog3\")\n###### Picture Source – agcocorp.com\n\nIn factories, **AR can display critical information from control systems, sensors, asset management systems, and knowledge repositories to make visible important monitoring and diagnostic data about each machine to aid in the diagnostic and repair process.** Seeing information in-context helps field technicians understand problems and take timely and even proactive actions.\n\nAt Boeing, AR is used to guide trainees through the 50 steps required to assemble an aircraft wing section involving 30 parts. With the help of **AR, trainees completed the aircraft assembly work in 35% less time** than trainees using traditional 2-D drawings and documentation.\n\n**AR drives efficiency,** by providing step-by-step instructions by highlighting elements, such as screws and faceplates, on a computer screen or hologram projection, in the correct order in the workflow. It also animates the elements to show how they are removed, replaced, or reassembled. As shown in the above picture, an employee at the agricultural equipment company AGCO views AR instructions for work on a tractor hydraulic valve stack. It was reported that the **use of AR resulted in a 40% percent improvement** in early-hour repair frequency for the tractors and applicators manufactured.\n\n**AR also ensures human safety,** for example, a worker can view a piece of equipment and see its running temperature, disclosing that the equipment is hot, and warning them that it is unsafe to touch with bare hands.\n\n#### Intelligent AR Navigational Guidance in Transportation\n\n![blog4](https://www.kaviglobal.com/wp-content/uploads/2022/03/blog4.png \"blog4\")\n\n###### Picture Source – HBR.org\n\nUntil recently, drivers using GPS navigation had to look at a map on a flat screen, and then mentally overlay the image in the real world (left image in figure above). This forced drivers into the unsafe behavior of continuously taking their eyes off the busy road to gaze down at a map, to ensure they didn’t miss their target exit ramp on fast moving highway.\n\nHowever, with AR heads-up displays, navigational images are overlaid directly over what the driver sees through the windshield (right image in figure above). **This solution is not only much easier, but much safer, as the reduced cognitive mental load maximizes focus, prevents unnecessary gaze aversion and distraction, and minimizes driver error.**\n\n#### Intelligent AR Fitting Room App in Consumer Fashion\n\n![blog5](https://www.kaviglobal.com/wp-content/uploads/2022/03/blog5.png \"blog5\")\n\n###### Picture Source: Synsam Group\n\nA Swedish eye retailer, Synsam, launched an app (“Stylelab”) to make choosing spectacles and sunglasses more fun, personal, and easy, no matter where you are. **The app helps customers see what they would look like wearing the product, without actually having to go into the store** to try out different eyeglasses physically. The range for adults consists of ten designs in ten colors, combined with a choice of ten different lens colors for a **total of 1,000 different combinations.** Consumers reported that the use of AR technologies immensely improved their shopping experience and customer satisfaction. **AR enabled apps maximize customer experience (CX) and customer delight by providing a fun and helpful remote option for product interaction.**\n\n#### How AR Works\n\nAR consists of three major components. Each component has its own challenge in the AR realization process, as outlined in the diagram below.\n\n![kg-2](https://www.kaviglobal.com/wp-content/uploads/2022/04/KG-2.png \"kg-2\")\n\nFirst, **Perception,** to accurately superimpose digital information on the physical world, AR technology must recognize what it is looking at and understand its own situation. For example, before providing navigation information, AR needs to track the locations of a car and recognize the lines, marks, signs, and other objects on the road. **These perceptions require advanced computer vision technologies to accurately and quickly process data collected from multi-sensors.**\n\nSecond, **Computation,** after data has been processed, AR may need to optimize the instruction or guidance provided to users to reduce operation costs/risks and increase efficiency. For instance, in manufacturing, processes are often complex, requiring hundreds or even thousands of steps, and mistakes are costly. **It is generally challenging for AR to analyze the data and solve the problem in real time.**\n\nLast but not least, **Display;** AR delivers the computed instructions or other synthesized information to users by making these instructions or information visualized. It is crucial to determine the proper content delivered to users in the right way such that people can absorb and process the information almost instantaneously. Data visualization, therefore, plays a key role in displaying the content by making the content visualizable in the 3-D world. **Intuitive Data visualization can significantly reduce human efforts in understanding information,** as the saying goes, “A picture is worth a thousand words.”\n\nDue to the above challenges that AR faces, it is still in its infancy stage. However, by overcoming these changes and gaining business readiness, AR has a bright future because AR enables human intelligence to seamlessly leverage the advantages of artificial intelligence. As depicted in the concept of augmented intelligence, the combination of human directing, adjusting, and focusing the elements of artificial intelligence results in achieving the desired results much more efficiently than traditional approaches.\n\n#### About the Author\n![blog6](https://www.kaviglobal.com/wp-content/uploads/2022/03/blog6.png \"blog6\")\n#### Xuesong Lu\nXuesong Lu is a Business Analytics Consultant at Kavi. Xuesong has a broad background in data science, applied mathematics, combinatorial optimization, and emergency management with a B.S. degree in Automation at NEU, an M.S. degree in Electrical Engineering at NYU, and a Ph.D. degree in Electrical Engineering at UConn. Xuesong enjoys jogging, swimming, and ice skating.",
                      "DisplayOrder": 5,
                      "ContentLink": "null",
                      "Name": "Our Clients & Partners",
                      "Label": "Our Clients & Partners",
                      "Slug": null,
                      "leadershipTeams": {
                        "data": [
                          
                        ]
                      }
                    }
                  },
                  {
                    "id": 8,
                    "attributes": {
                      "createdAt": "2023-05-11T19:46:42.699Z",
                      "updatedAt": "2023-05-15T15:28:15.110Z",
                      "publishedAt": "2023-05-11T19:46:42.699Z",
                      "FullContent": "#### Taking a tour through anomaly detection using AI\nAnomaly detection is a way to capture suspicious events which differ significantly from the majority of the data. Detecting anomalies can help automate auditing transactions for fraud, support reclaims efforts, and enable preventive actions going forward.\n\nThis technology is becoming more and more popular as fraud remains a serious issue across industries and traditional methods cannot adapt to the changes over time.\n\n![blog11](https://www.kaviglobal.com/wp-content/uploads/2021/01/%E5%9C%96%E7%89%871.png \"blog11\")\n\n![/AI-new-solution.](https://www.kaviglobal.com/wp-content/uploads/2021/01/AI-new-solution.png \"/AI-new-solution.\")\n\n### Why AI for Anomaly Detection \n#### Humanly Not Possible \n\n- **Data Volume and Complex Patterns** – Due to data flood and the complexity of anomaly patterns, humans provoke excessive false positives and overlook false negatives. Contextual and Collective anomalies patterns are also very difficult to notice with the human eye. If even 10% of 10 million annual expenses are marked problematic, that means a million expense line items would be needed to be investigated by the compliance team annually. \n- **Time-Consuming** – Investigating all skeptical transactions itself is already time-consuming, not to mention checking signatures and reviewing complex profiles one by one with historical data manually. AI, on the other hand, outperforms humans in accuracy, speed, and productivity in identifying all kinds of anomalies invalidation.\n- **Adapt to New Changes**- As the transactions get more and more complicated, so does the fraud. A proactive approach is needed to adapt to new fraud patterns as the overall data structures change and shift. While humans usually look for known patterns, AI machine learning can adapt to new changes over time, search for unknown patterns, and keep up with anomalies.\n\n#### Human in the Loop\nWe are not suggesting replacing humans with AI in all aspects of this matter. Rather than replace the human role, our solution brings employee and AI efforts together throughout the solution lifecycle as technology is utilized to realize the business benefit.\n![11](https://www.kaviglobal.com/wp-content/uploads/2021/01/%E5%9C%96%E7%89%873-1080x232.png \"11\")\n\nAfter AI models are built, anomalies have been monitored, and benefits have been quantified, employees can easily change the underlying assumptions/parameters based on different business scenarios and needs. Finally, the interpretable real-time reports generated by AI will guide users through the investigation process, empowering employees with previously unrevealed insights and taking further actions. What we provide is not simply identifying skeptical events at transaction levels, but leveraging AI to enhance the quality of the process and improve decision making.\n\n#### AI Anomaly Detection at Kavi Global\nKavi Global provides a wizard-driven, no-code software solution that applies AI to identify invisible anomaly signatures and flag the collusion of multiple fraudulent actors, in addition to identifying anomalous patterns for an actor or transaction level. We capture fraud at multiple dimensions to ensure point, global and contextual levels of detection.\n\n#### Use Cases Across Industries\nInvoices – Our AI solution is able to identify and monitor recurring fraudulent transactions and flag actors and even the conspiracy of fraudulent actors, such as repair billing fraud, inventory return abuse, fake shops/vendors collusion, duplicate charges, efficiently and automatically. \n\nPharma & Healthcare Billing Fraud, Waste & Abuse – Medical fraud detection is another popular field. In fiscal 2019, the Department of Justice recovered more than US$2.6 billion claims relating to the healthcare industry out of US$3 billion from civil cases involving fraud and false claims against the government. AI highlights anomalous systemic fraud patterns at a batch transaction level and flags the improper payment generated between actors i.e. doctors and pharmacists, and doctors and patients collusion.\n\n**Anti-Money Laundering (AML) **– Banks in the U.S. spend more than US$25 billion annually on anti-money laundering compliance on average according to Forbes. As the volumes, complexity, availability, and regulations change, AI machine learning could adapt to new changes over time and flag recurring fraudulent actors categories to augment the traditional rule-based monitor systems.\n\n**Insurance Fraud** – Insurance Research Council (IRC) also estimated that up to US$7.7 billion of auto injury claims were excessive payments in 2012, accounting for 13%-17% of the total payments of 5 main private passenger auto injury coverages. Traditional anomaly detection technology in the insurance industry recognized anomalies by fitting them into a preprogrammed template. As transactions get more and more complicated, so does the fraud. A proactive approach is needed to adapt to new fraud patterns and perform real-time dynamic analysis. \n\n**Supply Chain Sourcing, Production, & Quality Defects** – The more components and processes in the production line, the greater the remake time and costs. Revealing the root cause of defects in each manufacturing process to enhance the yield is one of the most inexpensive ways to guarantee the quality, shorten the lead-time, and stabilize the supply chain. AI can easily detect whether the outliers derive from the nature of the process, human factors, machine factors, time factors, or environmental factors, enabling stressors to be eliminated or controlled prior to any significant deterioration, and help you to identify improvement opportunities to achieve Six Sigma (3.4 defects per million, 99.99966%). \n\n## Identify Hidden Anomaly with AI-Powered Sight Now!\n#### About the Author\n\n![Priyansh-Dadar](https://www.kaviglobal.com/wp-content/uploads/2021/01/Priyansh-Dadar.jpg \"Priyansh-Dadar\")\n\n#### Priyansh Dadar\nPriyansh is a data scientist with six years of professional and academic experience in time-series analysis, machine learning, and data visualization. He has expertise in fraud detection and product analysis from previous roles. Priyansh holds a Master of Science in Business Analytics from Oklahoma State University.\n\n![Andy-Kuo-](https://www.kaviglobal.com/wp-content/uploads/2021/01/Andy-Kuo-610x610.jpg \"Andy-Kuo-\")\n\n#### Andy (Yen-Dah) Kuo\nAndy is a data-driven solution provider with 5+ years of experience in finance and 2+ years in supply chain. He has a Master’s Degree in Supply Chain Management from University of Michigan. Expertise in developing logistic models, optimizing global supply chains, and building inventory models.",
                      "DisplayOrder": 8,
                      "ContentLink": "null",
                      "Name": "Awards",
                      "Label": "Awards",
                      "Slug": null,
                      "leadershipTeams": {
                        "data": [
                          
                        ]
                      }
                    }
                  }
                ]
              }
            },
            {
              "id": 4,
              "Styles": "Orange",
              "Card": "Card1",
              "Label": "Services",
              "Title": "Services",
              "DisplayOrder": 4,
              "offerings": {
                "data": [
                  {
                    "id": 3,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-05-04T09:58:43.038Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Services",
                      "Description": "null",
                      "Name": "Business Intelligence",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> Business intelligence</h1>\n</br>\n\n#### Business intelligence is not just about analyzing data, it is about enabling better business decisions and solutions through data\n</br>\n\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/B1_e64a99dacf.JPG\" >\n\n\n\n</br>\n\n#### Kavi Global will help you to\n</br>\n\n- Get actionable insights at the click of a button\n\n- Implement automated data gathering tools for scalability\n\n- Remove data roadblocks and non-standard information in silos\n\n- Automate metrics complication and analysis across the organization\n\n- Deploy any visualization tools required to improve operations\n\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/B2_3abd9387ad.JPG\"> </p>\n\n</br>\n\n[Explore more about our Intelligence to Insights (i2i) Framework](https://www.kaviglobal.com/services/businessintelligence/i2i/)\n\n\n</br>\n\n\n### Our i2i Success Stories\n</br>\n\n##### Service Contract Analytics\n</br>\n\n[Learn more](https://www.kaviglobal.com/success-stories/service-contract-analytics/)\n\n</br>\n\n#### Some BI and Data Visualization technologies we work with:\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/B4_258f4676f9.JPG\"> </p>\n\n\n</br>\n\n#### Want to take your data analysis to the next level? ####\n</br>\n\n##### Let’s discuss your data goals ####\n</br>\n\n[Contact Us](https://www.kaviglobal.com/contact-us/)\n",
                      "DisplayOrder": 3,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=business_intelligence",
                      "Label": "business_intelligence",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 6,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T11:24:18.566Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Services",
                      "Description": "null",
                      "Name": "Optimization",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> Optimization </h1>\n</br>\n\n### Maximize the Margin\n</br>\n\n<p align=\"justify\">Optimization is to determine the best action that maximizes or minimizes the target functions, such as profits or finite resources, to improve overall performance with high efficiency. Many applied business problems require optimization, such as labor planning, service level, logistics, and portfolio management. </p>\n\n</br>\n\n- US companies carried more than $1.9 trillion in inventory\n\n- 80% of overall inventory consumption comes from just 20% of total items\n\n- For 2018 US logistics costs, 28% is spent on Inventory carrying costs, 65% is    spent on Transportation costs.\n\n</br>\n\n<h3 align=\"center\"> Why is optimization difficult and how we can help? </h3>\n</br>\n\n#### Countless permutations & Combinations\n</br> \n\n<p align=\"left\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/O1_136033e093.JPG\" > </p>\n</br>\n\nCountless and non deterministic variables in the real world make the business problems intractable and can not be solved by enumeration.\n\n</br>\n\n#### Nonlinear Relations\n</br>\n\n<p align=\"left\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/O2_f91643bc25.JPG\" > </p>\n</br>\n\n<p align=\"justify\">Nonlinear relations make the optimum solution counterintuitive. It is almost impossible for humans to find the point that balances all parameters at the same time and see the big picture of all functions in the long term. </p>\n\n</br>\n\n#### Complicated Constraints and Data Flood\n</br>\n\n<p align=\"left\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/O3_64d140248b.JPG\" > </p>\n</br>\n\n<p align=\"justify\">It is often too complicated to rely solely on managerial intuition to identify the optimum solution due to the data volume and multiple constraints. Our customized models can quickly provide compromised solutions under the constraints of capacity, budget, time, and labor factors...etc. </p>\n\n</br>\n\n\n<h3 align=\"center\"> Our step-by-step package solution </h3>\n</br>\n\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/OP_1_01e1dbff73.JPG\"> </p>\n\n<h3 align=\"center\"> Use Cases </p>\n</br>\n\n###    Network Optimization\n</br>\n\n\n<p align=\"left\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/O4_21471d7ac2.JPG\" > </p>\n</br>\n  \n<p align=\"justify\">There is no \"one-size-fits-all\" logistics solution, different supply chain segmentation requires different solutions at different decision levels. We target location, number, capacity, infrastructure, design, and automation first, strike the balance between centralized and decentralized distribution systems, and optimize scheduling, routing, and fleet utilization. Our solution scans through different outcomes when adding new elements, making what-if assumptions, and evaluating external factors to enable the organization meet the customer's demand at desired service level efficiently.\n</p>\n</br>\n\n### Inventory Optimization\n\n</br>\n\n<p align=\"left\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/O5_1502a75bab.JPG\" > </p>\n</br>\n\n<p align=\"justify\">80% of overall inventory consumption comes from just 20% of total items. Our model indicates the optimal order quantity, service level, and safety stock for each review period based on product features, lead-time fluctuations, and demand uncertainty to ensure you carry the right inventory, in the right locations, at the right time and strike the balance between customer retention and working capital. </p>\n\n</br>\n\n### Process Optimization\n\n</br>\n\n<p align=\"left\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/O6_628405362b.JPG\" > </p>\n</br>\n\n<p align=\"justify\">The goal of process optimization is to maximize the efficiency or through put and minimize the cost by making the best use of resources without violating the constraints. Automating inefficiency processes doesn’t make the situation better. Our customized solution helps you to improve underlying processes, streamline workflows, eliminate redundancies, and improve communication. </p> </br>\n\n### Scheduling Optimization\n\n</br>\n\n<p align=\"left\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/O7_6c48464450.JPG\" > </p>\n</br>\n\n<p align=\"justify\"> Scheduling optimization is to ensure each individual task in a schedule is aligned with the organization's ultimate goal and customers demand to minimize movement costs, and total cycle time and increase labor productivity, capacity/resource utilization, and pricing power across facilities. </p> \n\n</br>\n\n### Portfolio Optimization\n\n</br>\n\n<p align=\"left\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/O8_a92ad17e1a.JPG\" > </p>\n</br>\n\n<p align=\"justify\">Diagnose your physical/non-physical asset mix to know which categories should stay in your current business portfolio to enhance profitability, liquidity, and stability. Benchmark historical performance to identify hidden improvement opportunities, mitigate risks, and improve return on investment under the constraint of capital and instruments.\n</p>\n\n</br>\n\n#### Read Client Success Stories\n</br>\n\nReduced 40% of IoT Sensors placement and saved USD 20 Million for a Chemical Manufacturer. \n[Learn More](https://www.kaviglobal.com/success-stories/iot-sensor-reduction-through-optimal-sensor-placement/)\n\nGenerated 5% more revenue from portfolio optimization for a Transportation conglomerate.\n[Learn More](https://www.kaviglobal.com/success-stories/portfolio-optimization/)\n\n",
                      "DisplayOrder": 6,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=optimization",
                      "Label": "optimization",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 4,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T14:15:02.196Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Services",
                      "Description": "null",
                      "Name": "Data Science",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> Data Science </h1>\n</br>\n\n<p align=\"center\"><img src=\"https://www.kaviglobal.com/wp-content/uploads/2018/08/time-jump.png\"> </p>\n</br>\n\n<p align=\"center\"> <a href=\"https://www.kaviglobal.com/services/data-science/jumpstart-program/\">Learn More</a> About Our Data Science Jumpstart Program</p>\n\n</br>\n\n<p align=\"justify\">Kavi’s team of expert data scientists help you transform your data into actionable insights. We utilize descriptive, predictive and prescriptive analytics to extract valuable learnings so you can make better, more strategic business decisions. </p>\n\n<h3 align=\"center\"> Use Cases </h3>\n\n<br/>\n\n<h4 align = \"center\"> Industry Use Cases Across the Analytics Lifecycle\n\n</br>\n</br>\n\n\n<p align=\"center\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/Data1_974ec9d093.JPG\" width=\"1000\" height=\"300\">\n</p>\n\n</br>\n\n\n<h3 align=\"center\"> Our Advanced Analytics Capabilities </h3>\n</br>\n\n<p align=\"center\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/Data3_03c98e0452.JPG\" width=\"1300\" height=\"450\">\n</p>\n</br>\n\n<h3 align=\"center\"> Operationalizing Analytics </h3>\n</br>\n\n#### From Business Problem to Data Science Model Deployment\n</br>\n\n\n<p align=\"center\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/Data2_4caf8492e4.JPG\" width=\"1000\" height=\"400\">\n</p>\n</br>\n\n- Optimization Services  <a href=\"https://www.kaviglobal.com/services/optimization/\">Learn More</a>\n</br>\n\n- AI Services  <a href=\"https://www.kaviglobal.com/kavi-labs-enterprise-ai/\">Learn More</a>\n</br>\n\n- Analytical Solutions Specific To Your Business Function  <a href=\"https://www.kaviglobal.com/solution/functional-analytics/\">Learn More</a>\n</br>\n\n- Analytical Solutions Specific To Your Industry  <a href=\"https://www.kaviglobal.com/solution/industry-solutions/\">Learn More</a>\n</br>\n\n\n<h3 align=\"center\"> Some analytics technologies we work with </h3>\n</br>\n\n<p align=\"center\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/P1_2b85c49685.JPG\" width=\"1000\" height=\"115\">\n<img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/P2_80bfdaef3a.JPG\" width=\"1000\" height=\"115\">\n</p>\n\n[T<u>ags:</u>  data science, data science chicago, data science companies, data science company, data science consulting, data science consulting chicago, data science consulting companies, data science consulting company, data science consulting firms in chicago, data science consulting jobs, data science flowchart, data science for business, data science it, data science management consulting, data science service providers, data science services, data science services company chicago, data science skills, data science technologies, top data science companies](https://www.kaviglobal.com/tag/data-science-for-business/)\n\n",
                      "DisplayOrder": 4,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=data_science",
                      "Label": "data_science",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 9,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T11:11:57.732Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Services",
                      "Description": "null",
                      "Name": "Managed Service",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> Managed Services </h1>\n</br>\n\n<h3 align=\"center\"> Specialized Capacity across Cloud, Applications, & AI </h3>\n</br>\n\n<h3 align=\"center\">  Kavi is your Strategic Managed Services Partner </h3>\n</br>\n\n<h3 align=\"center\"> Highly Skilled Technology Consultants On Demand </h3>\n</br>\n\nKavi Managed Services team is your strategic partner to take on, transform, and run business operations and processes to improve quality and efficiency on a long term basis.\n</br>\n\n![IMAGE](https://www.kaviglobal.com/wp-content/uploads/2021/03/image-6.png \"IMAGE\")\n\n</br>\n\n\n#### Client-centric Service\n</br>\n\n<p laign=\"justify\">Greater focus on core business enhances member and provider relations and client-centric service. Incremental level of service and modular approach allows customization of the offering based on the IT support required, with clearly defined and predictable costs. </p>\n</br>\n\n#### Painless Transitions\n</br>\n<p align=\"justify\">\nOur Four-Phase TOMEI Framework (Transition, Operate & Maintain, Evaluate, and Improve) ensures risk-free transition , sustainable steady-state framework, and scope for continuous improvement. Each of the four overlapping phases incorporates a holistic strategy covering people, process, and technology. </p>\n</br>\n\n#### TOMEI Framework\n</br>\n\n![framework](https://www.kaviglobal.com/wp-content/uploads/2021/03/framework.jpg \"framework\")\n</br>\n</br>\n\n\n#### Continuous Improvement\n</br>\n\n<p align=\"justify\">KAVI provides managed services across platforms and models. We ensure the smooth functioning of IT applications and enterprise operations while continuously optimizing cloud services. We offer managed IT services for operational support as well as strategic services at value businesses and ensure that your enterprise aligns with the business environment and mitigates risks with effective change management.\n</p>\n</br>\n\n<h4 align=\"center\"> Kavi's Managed Services Offerings </h4>\n</br>\n\n#### Cloud Support ####\n</br>\n\n![image](https://www.kaviglobal.com/wp-content/uploads/2021/03/Cloud-Managed-Services.jpg \"image\")\n</br>\n\n##### End to end Cloud Management\n</br>\n\n<p align=\"justify\">Kavi’s cloud consulting services can help you find the right mix of hybrid cloud that can turn your IT organization into a valuable change agent for innovation and growth. Our team of cloud computing consultants can help you build the right cloud for your business and evolve your team’s culture and skills to embrace cloud. KAVI Cloud Managed Services span across provisioning, operations, monitoring, security, performance management, support, and sustenance of private, public and hybrid infrastructure. </p>\n\n[Check out more about our Cloud Migration Offerings](https://www.kaviglobal.com/services/cloud/)\n\n</br>\n\n#### Application & Technology Support ####\n</br>\n\n![Application-Technology](https://www.kaviglobal.com/wp-content/uploads/2021/03/Application-Technology.jpg \"Application-Technology\")\n</br>\n\n##### Value Driven Application Management\n</br>\n\n<p align=\"justify\">Kavi’s Application support and maintenance services are aimed at ensuring that applications are highly available, reliable and stay relevant to current business needs. We offer comprehensive KPI-based end-to-end support for the uninterrupted performance of mission-critical business applications and software products from install and setup, to security configurations, to end user support services. </p>\n</br>\n\n\n#### Enterprise AI Support ####\n</br>\n\n![Enterprise-AI-Support](https://www.kaviglobal.com/wp-content/uploads/2021/03/Enterprise-AI-Support.jpg \"Enterprise-AI-Support\")\n</br>\n\n\n##### ModelOps to Support AI Models in Production\n\n<p align=\"justify\">Kavi’s Enterprise AI Service includes ModelOps, providing collaboration between data scientists and operations professionals, orchestrating and managing machine learning and deep learning models lifecycle across the business, including production, evaluation, application, and governance. Serving as the core of AI strategy, ModelOps framework ensures that no matter at which stage, AI models are under well-rounded governance, aligned with organizations’ overall goals and KPIs, and could be evaluated by business domain experts, thereby supporting the development and deployment of complicated AI models in production and monetization.\n</p>\n</br>\n\n<h3 align=\"center\"> Technology Skill Matrix </h3>\n</br>\n\n<h3 align=\"left\"> Data Management </h3>\n\n![Alt Text](https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/Data_Management_62d115673f.JPG)\n\n</br>\n\n<h3 align=\"left\"> BI & Visualization </h3>\n\n![Alt Text](https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/BI_Visulization_89070ff85b.JPG)\n\n</br>\n\n\n<h3 align=\"left\"> Applications </h3>\n\n![Alt Text](https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/Application_be1bacf5b5.JPG)\n\n</br>\n\n\n<h3 align=\"left\"> Optimization </h3>\n\n![Alt Text](https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/Optimization_27607c7144.JPG)\n\n\n</br>\n\n<h3 align=\"left\"> Data Science </h3>\n\n![Alt Text](https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/Data_Science_3705aec91a.JPG)\n</br>\n\nBrowse Enterprise Managed Service Success Story [\nLearn More](https://www.kaviglobal.com/success-stories/managed-services/)\n\nCheck out our latest Blog about Managed Services [\nLearn More](https://www.kaviglobal.com/services/managed-services/)\n",
                      "DisplayOrder": 9,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=managed_service",
                      "Label": "managed_service",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 1,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T10:28:53.655Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Services",
                      "Description": "null",
                      "Name": "Strategy & Roadmap",
                      "ShortContent": "Our mission is to bridge the gap between need and results- to use data and analytics to deliver business value while accelerating your journey to analytical maturity.",
                      "FullContent": "\n<h1 align=\"center\"> Strategy & Roadmap </h1>\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/S_and_R_2_087a614c85.JPG\"  >\n<br></br>\n\n<div>\n<h5  align=\"center\">Change is Hard </h5>\n</div>\n\n<div>\n<h5  align=\"center\">Let us help make it easier</h5>\n</div>\n\nOur mission is to bridge the gap between need and results- to use data and analytics to deliver business value while accelerating your journey to analytical maturity.\n\n- Gain Leadership, Middle Management, and User Buy In with Psychologically proven set of best practices\n\n- Ensure Success by Creating a Change Culture with Change Ambassadors\n </br>\n \n\n<img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/S_and_R_3_ff16bba054.JPG\" >\n</br>\n</br>\n\n\n<p align=\"justify\">There is no one-size-fits-all approach to analytical maturity: It is a journey personal to each organization. A journey with incremental, systemic change required in people, process, and technology.</p>\n\n<p align=\"justify\">You cannot just implement new SaaS tools or hire a team of data scientists to become an analytically mature organization. Insight generation, an intense focus on customer, and scalable systemic growth require analytics to be baked into your strategy and culture. </p>\n</br>\n\n<h4 align=\"center\">How we work together </h4>\n</br>\n\n<h5 align=\"center\">Our Analytics Value Acceleration framework delivers value through </h5>\n</br>\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/SR_1_933301b52a.JPG\" > </p>\n</br>\n\n\n\n<div>\n<h5  align=\"center\">  Learn More About Our Offerings</h5>\n</div>\n\nWe partner with you on a Discovery & Design engagement to analyze your business and determine the most impactful analytic project opportunities.\n\n  <a href=\"https://www.kaviglobal.com/solution/enterprise-solutions/\">Explore our Enterprise Solutions</a>\n\n93% of companies consider Intelligent Technology a key to Digital Transformation (Forrester Survey commissioned by SAP 20149).\nKavi will design and develop custom Products for your\nbusiness using design thinking.\n\n  <a href=\"https://www.kaviglobal.com/services/product-development/\">Product Development Services </a>\n\nKavi Micro solutions are AI accelerators to rapidly provide in-demand\ndata science capabilities.\n\n  <a href=\"https://www.kaviglobal.com/solution/ai-accelerators/\">AI Accelerators</a>\n\n",
                      "DisplayOrder": 1,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=strategy_roadmap",
                      "Label": "strategy_roadmap",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 5,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T12:28:41.889Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Services",
                      "Description": "null",
                      "Name": "Product Development",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\">Product Development </h1>\n</br>\n\n<h3 align=\"center\"> Unlock Trapped Value with New Digital Products </h3>\n</br>\n\n<h3 align=\"center\"> Blue Ocean Product Innovation Propels Business Growth\n</h3>\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/A_69b99b6fc3.JPG\" > </p>\n</br>\n\n\n<p align=\"justify\">A businesses economic moat can be undone in a matter of months or years with the pace of technology evolution and industry disruption. Thus, every company must think like a technology company and reinvent themselves.</p>\n\n<p align=\"justify\">Successful companies are able to secure revenue streams and maintain their competitive edge by embedded digital into the DNA: leveraging data and analytics to ensure internal operations run smoothly, as well as to create new blue ocean strategy market offerings.</p>\n</br>\n\n#### The Next Wave of Digital Products are Intelligent Software Solutions with Embedded AI\n</br>\n\n<p align=\"justify\">With huge volumes of data and automation capabilities with AI, more and more, solutions require integration with analytical models that can aggregate, summarize, visualize, and recommend decision support for users to make their workflow more efficient.</p>\n</br>\n\n\n### PRODUCT STRATEGY\n</br>\n\n#### Turning Ambiguous ideas into a Business Case with ROI\n</br>\n\n- Product Vision    \n\n-  Business Case      \n\n-  User Personas\n\n<p align=\"justify\">Oftentimes we see that companies jump into developing a product that they think is going to be successful. This is risky. We strongly advocate going through a well thought out strategy phase. plan of what the business hopes to accomplish, who it will serve, and how it is going to help them. </p>\n</br>\n\n### DESIGN & DISCOVERY\n</br>\n\n#### Ensure you are solving the right problem in the best way\n</br>\n\n- User Interviews    \n\n- Feature Roadmap    \n\n- Implementation Plan\n\n</br>\n\n### Solve the Right Problem\n</br>\n\n<p align=\"justify\"> We consider these two steps to be the foundational activity which sets the tone for a successful product. Understanding the problem is half solved. During the discovery session, we talk to all the personas who play a role in the product and understand their goals, pains, and needs. Uncertainty is at the peak during this stage. Through our user and market research, we help our customers set a vision that helps us propel in the right direction. </p>\n\n<p align=\"justify\">Setting the vision helps everyone involved in building the product to have a clear outlook. This brings the entire team together. From CEOs to Developers to Marketing and Sales, everyone is working towards the common goal. For instance, Developers can prioritize their tasks to check if it helps or hurts the vision. </p>\n</br>\n\n### Build it so it’s Easy to Use\n</br>\n\n<p align=\"justify\">Products are built by humans to be used by humans and that is why we preach human centric designs. Why this philosophy? So, it is vital for any product to understand the range of your customers. Our products designs follow three pillars- simple, intuitive, and future proof. </p>\n</br>\n\n![kavi](https://www.kaviglobal.com/wp-content/uploads/2021/03/Untitled-4-1.png \"kavi\") \n</br>\n\n\n### Tackling Uncertainty\n</br>\n\n <p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/A1_99fff1c30d.JPG\"> </p>\n \n  </br>\n \n <h3> PRODUCT EXECUTION </h3>\n  \n</br>\n\n#### Don’t just deliver, delight and support\n\n-  Minimum Loveable Product    \n\n-  Implementation Support \n\n-  Benefits Tracking\n\n<p align=\"justify\">Agile is in our DNA, which is why we think big, start small, and act fast. Oftentimes a product idea might sound very appealing to us, but we can be sure of it once it is tested. </p>\n</br>\n\n### At Kavi- We believe 100 iterations are better than 100 hours\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/A2_19819db02d.JPG\" > </p>\n\n</br>\n</br>\n\n\n<p align=\"justify\"> Every product goes through phases. During the execution our first and foremost is to launch a minimum lovable product (MLP) in the startup phase. We don't want the product to be just viable. Moving through such phases sets a clear short-term target. As we progress, we find what our customers really want, and we will focus on creating values. </p>\n\n<br/>\n\n<p align=\"center\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/A3_323c322952.JPG\"> </p>\n\n</br>\n</br>\n\n\n### KPIs:\n</br>\n\n<p align=\"justify\">Setting the right metrics. During the execution phase, it is vital for us to set the right metrics to measure our success. We have seen well-built products lose focus over the years because of not setting the right metrics. </p>\n</br>\n\n### Benefits Realization:\n</br>\n\n<p align=\"justify\">Measuring the ROI. When the product is rolled out it is important to measure the key KPIs around benefits realization, as well as performance, and user experience </p>\n</br>\n\n\n![open](https://www.kaviglobal.com/wp-content/uploads/2021/03/open.png \"open\")What's measured can be improved![close](https://www.kaviglobal.com/wp-content/uploads/2021/03/close-1.png \"close\")\nPeter Drucker\n</br>\n\n\n### Customer Experience is No Longer Optional!\n</br>\n\n#### Product Designs that Delight from intuitive User Interfaces to streamlined Business Process Integration!\n</br>\n\n<p align=\"justify\">Design-led companies such as Apple, Pepsi, Procter & Gamble and SAP have outperformed the S&P 500 by an extraordinary 211%. When design principles are applied to strategy and innovation, the success rate for innovation dramatically improves. </p>\n\n<p align=\"justify\"> We deliver best in class, beautiful user interfaces and intuitive workflows with user centered designs, because we know that if users love a product, it will be adopted and the sustainability of the solution will result in ROI. We use various techniques such as Design Thinking & the Kano model to come up with the right set of features to build. </p>\n\n### Rapidly Innovate with Design Thinking\n\n| ![img1](https://www.kaviglobal.com/wp-content/uploads/2021/03/Empathize.png) </br>| ![img2](https://www.kaviglobal.com/wp-content/uploads/2021/03/Define.png) </br> | ![img3](https://www.kaviglobal.com/wp-content/uploads/2021/03/Ideate.png) </br> | ![img4](https://www.kaviglobal.com/wp-content/uploads/2021/03/Prototype.png) </br> | ![img5](https://www.kaviglobal.com/wp-content/uploads/2021/03/Test.png)  </br> |\n|---- |------| ------- | ------- | -------|\n</br>\n| Learn about audience for whom you are designing </br> | Create PoV based on user needs and insights </br> | Brainstorm creative ideas </br> | Model one or more ideas </br> | Share prototype for testing and feedback </br> |\n\n</br>\n\n[Read](https://www.kaviglobal.com/blog/unlocking-value-using-design-thinking/) our latest blog on Design Thinking\n</br>\n\nManaged Services for Product Support [Learn More](https://www.kaviglobal.com/services/managed-services/)\n\nRead Client Success Story [Learn More](https://www.kaviglobal.com/services/product-development/#)\n\nAI Accelerators [Learn More](https://www.kaviglobal.com/solution/ai-accelerators/)\n\n",
                      "DisplayOrder": 5,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=product_development",
                      "Label": "product_development",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 2,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-05-04T09:44:39.829Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Services",
                      "Description": "null",
                      "Name": "Enterprise Data Platform",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> Enterprise Data Platform </h1>\n</br>\n\n#### Power Your Intelligent Enterprise\nAn Intelligent Enterprise requires an agile data platform to provide Data & Analytics as a Service to the business to drive strategic outcomes.\n</br>\n\n#### Enterprise Data Platform Layers\n</br>\n\n#### Corporate Drivers\n</br>\n\n***Create Business Value***\n- Customer Focus | Compliance | M&A | Risk | Quality | Strategy | Operational       Excellence\n\n</br>\n\n#### Data Science Solutions ####\n</br>\n\n***Leverage Analytics for Strategic Decision Support***\n- Data Visualization | Business Intelligence | Artificial Intelligence\n</br>\n\n#### Data Services ####\n</br>\n\n***Provide Reliable Data for Reporting & Analytics***\n- Data Architecture | Metadata Management | Data Security | Data Lineage\n  Data Quality | Data Profiling |  Data Governance\n  </br>\n  \n#### Data Infrastructure ####\n</br>\n\n***Infrastructure for Storage & Compute***\n- Data Lake | Data Warehouse (Cloud/On Prem, Hybrid)\n</br>\n\n#### Data Integration ####\n</br>\n\n***Internal & External Data Sources***\n- Source Systems |  Connected Devices (IIoT, IoMT, Wearables)\n\n</br>\n\n#### Benefits\n</br>\n\n- Data is integrated, from multiple sources and/or connected devices, to create a single source of truth\n\n- Data is available and accessible at the time of need\n\n- Data is governed, so data is accurate, reliable, and trusted\n\n-  Data is standardized, so definitions, KPIs, and metrics are standardized and consistent across the business\n\n- Data is secure and managed via access controls granted by approvals\n</br>\n\n![image](https://www.kaviglobal.com/wp-content/uploads/2021/02/image1-5.jpg \"image\")\n\n</br>\n\n#### Digital Twin\n\n</br>\n\n<p align=\"justify\">Create virtual replicas of physical product, process, or service to allow analysis of data and monitoring of systems to head off problems before they even occur, prevent downtime, develop new opportunities and even plan for the future by using simulations.\n\n#### Digital Thread\n\n<p align=\"justify\">Connect your holistic enterprise data to create a single source of truth so that you can look across your enterprise to optimize and create new competitive advantages.\n\n#### Technology Agnostic\n\n<p align=\"justify\"> Leveraging tools like Advana, we are able to build technology agnostic enterprise data platforms, so they can evolve (migrate) at the click of a button, to keep pace with the continuous technology innovation, like new platforms for storage and compute.\n\n#### Business Rules & Definitions\n\n<p align=\"justify\">Business Rules & definitions are stored in a business layer that is easily migrated when new technologies are adopted into the technology strategy and platform.\n\n#### Governance\n\n<p align=\"justify\"> Holistic people, process, and technology approach to data governance to drive reliable and high quality data that is trusted and leveraged by the business.\n\n### Client Testimonial\n\n![open](https://www.kaviglobal.com/wp-content/uploads/2021/03/open-1.png \"open\") The data governance processes built for our bank customer and household database is built on superior MDM and data quality rules that drive overall data richness and effectiveness. The MDM model helped us to improve unique customer identification, unique address list selection and correct household movement detection. This in turn led us to huge print cost savings, increased campaign effectiveness, improved client experience and insights, simplified analytics processes and household-based modeling. This system will give us a head start for better analytics for our future engagements.![close](https://www.kaviglobal.com/wp-content/uploads/2021/03/close-2.png \"close\")\n\n– Senior Vice President, Analytics at the largest bank in Jacksonville, Florida\n\n</br>\n\n[Read Client Success Story ](http://https://www.kaviglobal.com/success-stories/enterprise-analytics-re-architecture/ \"Read Client Success Story >>\")\n\n</br>\n\n\n|Check out our BI Capabilities   | Check out our AI Capabilities  | Check out AI Accelerators  |\n| :------------: | :------------: | :------------: |\n| <p align=\"left\">Visualize your data and gain descriptive insights  </br>  [Learn More ](https://www.kaviglobal.com/services/businessintelligence/)   | <p align=\"left\">Browse what you predictive & prescriptive capabilities for your Digital Solutions Layer </br>  [Learn More ](https://www.kaviglobal.com/services/enterprise-data-platform/#) | <p align=\"left\"> for your Data Platform Data Science Solution Layer Toolbox </br>  [Learn More ](https://www.kaviglobal.com/ai-accelerators/) |\n\n",
                      "DisplayOrder": 2,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=enterprise_data_platform",
                      "Label": "enterprise_data_platform",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 7,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T12:04:44.171Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Services",
                      "Description": "null",
                      "Name": "Internet Of Things",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> Be an IoT Leader </h1>\n</br>\n\n### Not an IoT Laggard\n</br>\n\nWith the rapid pace of change in IoT, especially in disciplines such as intelligent machines, expertise to build holistic solutions is scarce. Kavi Global as a dedicated IoT Partner will help you create and implement a better IoT strategy; as well as address all skills and expertise equirements in your IoT blueprint.\n</br>\n\n### The Merge of Two Superpowers: IoT & Analytics\n</br>\n\n<p align=\"justify\">Internet of Things (IoT) has fundamentally changed the way of doing business. We are now in the Fourth Industrial Revolution, aka Industry 4.0, which takes the automation and digitization we saw in the Third Industrial Revolution into the future. Industry 4.0 is powered by the Industrial Internet of Things (IIoT) and cyber-physical systems.n </p>\n\n<p align=\"justify\">IoT analytics is the application of data analysis tools and procedures to realize value from the huge volumes of data generated by connected Internet of Things devices. The potential of IoT analytics is often discussed in relation to the Industrial IoT which makes it possible for organizations to collect and analyze data from sensors on manufacturing equipment, pipelines, weather stations, smart meters, delivery trucks and other types of machinery.\n</p>\n</br>\n\n### IoT: Driving Analytics to the Edge\n</br>\n\n<p align=\"justify\">IoT has also been driving analytics to the edge, which means collecting and analyzing data at the sensor, device, or touch point itself rather than waiting for the data to be sent back to a cloud or on-premise server. Starting from designing the architecture to deploying the defined architecture across the organization, we have expertise in implementing solutions such as remote monitoring and diagnostics, reliability analytics, asset downtime reduction as well as addressing all skills and expertise equipments in your IoT blueprint. </p>\n\n</br>\n\n\n<h3 align=\"center\"> IoT Use Cases </h3>\n</br>\n\n####  Industrial Awakening with IoT & Analytics: Unleash the trapped value in your sleeping assets\n</br>\n\n#### IIoT & Streaming Analytics for Predictive Maintenance of Intelligent Industrial Assets\n\n</br>\n\n![IIoT](https://www.kaviglobal.com/wp-content/uploads/2020/12/18.jpg \"IIoT\")\n\n</br>\n\n<p align=\"justify\">Predictive maintenance involves continuous monitoring of machine and sensor data to help equipment manufacturers and service providers predict and address maintenance issues before they occur. With Cloud Native solutions like Azure IoT Hub, sensors can be integrated as devices to the IoT Hub, which can receive messages periodically from the devices, and send it to other solutions such as Azure Time Series Insights for continuous monitoring. </p>\n\n</br>\n\n#### Wearables & IoMT: Enabling Telemedicine & Remote Outcomes\n</br>\n\n#### IoMT for Real time Patient Monitoring from Wearables & Intelligent Healthcare Medical Devices\n</br>\n\n![IoMT](https://www.kaviglobal.com/wp-content/uploads/2020/12/19.jpg \"IoMT\")\n</br>\n\n<p align=\"justify\">IoMT enables medical devices and innovative sensors to connect to the internet, which facilitates the collection of huge amounts of critical data. This data can then be analyzed and used to understand patient conditions, to diagnose faster and more accurately, and to understand resource utilization patterns at a healthcare facility. Some other exciting use cases for IoMT analytics involve Remote real-time patient monitoring, Chronic disease monitoring, verifying treatment plan adherence, etc. </p>\n</br>\n\n#### Patient Monitoring\n</br>\n\n<p align=\"justify\">Technology to enable monitoring of patients outside of conventional clinical settings, such as in the home or in a remote area, which increases access to care and decreases healthcare delivery costs. </p>\n</br>\n\n#### Medication Adherence\n</br>\n\neCAP is a smart pill bottle which monitors patients medication consumption as prescribed by their doctors. AI driven alerts remind patients to take medicine, and alert doctors when they do not. |\n</br>\n\n\n<h3 align=\"left\">Kavi Global will help you to </h3>\n\n\n- Design the IoT strategy required to solved your data needs\n    \n-  Map the flow of data from data gathering to analytics\n    \n-  Decide where to perform the analytics in your architecture\n    \n- Deploy the defined architecture across the organization\n    \n- Arrive at the optimal level of automation\n\n</br>\n\n\n<h3 align=\"center\"> Our IoT Capabilities Include </h3>\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/A11_84ce180f96.JPG\"> </br>\n</br>\n\n<h3 align=\"center\"> Our IoT Capability Framework </h3>\n</br>\n\n\n![Our-IoT-Capability-Framework](https://www.kaviglobal.com/wp-content/uploads/2020/11/Our-IoT-Capability-Framework.jpg \"Our-IoT-Capability-Framework\")\n</br>\n</br>\n\n\n<h3 align=\"center\">Some of the many IoT technologies we work with </h3>\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/Z1_19566e779f.JPG\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/Z2_e3baaa2802.JPG\"> </p>\n\n\n\n\n<h4 align=\"left\"> Our IoT Success Story </h4>\n</br>\n\nHelping a Manufacturing conglomerate enter the IIoT Market and build new revenue streams\n\n</br>\n\n[Learn more](https://www.kaviglobal.com/success-stories/iiot/)\n\n\n\n\n\n\n",
                      "DisplayOrder": 7,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=internet_of_things",
                      "Label": "internet_of_things",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 8,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-25T14:51:46.809Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Services",
                      "Description": "null",
                      "Name": "Cloud",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> Cloud Services </h1>\n</br>\n\n###  Making your IT architecture weightless\n</br>\n\n<p align=\"justify\">he fast pace of technological advances has an ever increase toll on IT infrastructure as systems become more demanding and the amount of data becomes unmanegeable. Moreover, new an improved applications come to market every year, which forces IT teams to focus constantly on architecture planning and infrastructure modernization. Our approach to Cloud provides a clear framework of diagnostic, planning, migration and optimization to ensure that all your infrastructure needs are covered. </p>\n</br>\n\n\n<h3 align=\"left\"> Cloud is not the solution, it is a solution </h3>\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/C2_b4d4760729.JPG\"> </p>\n</br>\n</br>\n\n\n\nAnd as with any other technological solutions it is important to understand when to leverage it to maximize the value of your IT architecture and when it is actually not useful. Developing a sound cloud strategy is actually top priority.\n</br>\n\n### Kavi Global will help you to\n</br>\n\n - Design the cloud strategy that provides the best value at the lowest cost\n\n - Map your IT architecture from data to applications\n\n - Define clear IT architecture maintenance and management guidelines\n\n - Develop a framework for further IT architecture optimization opportunities\n\n - Provide overall support for your cloud services\n \n</br>\n\n\n### Our cloud services capabilities include:\n\n</br>\n</br>\n\n<p align=\"left\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/C1_0f99c9b2ea.JPG\"> </p>\n\n</br>\n</br>\n\n<h3 align=\"left\"> Cloud Technologies we work with </h3>\n</br>\n\n<img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/A1_81cd45ec36.png\">",
                      "DisplayOrder": 8,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=cloud",
                      "Label": "cloud",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  }
                ]
              },
              "aboutKavi": {
                "data": [
                  
                ]
              }
            },
            {
              "id": 5,
              "Styles": "Orange",
              "Card": "Card2",
              "Label": "Solutions",
              "Title": "Solutions",
              "DisplayOrder": 5,
              "offerings": {
                "data": [
                  {
                    "id": 13,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T06:51:09.082Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Solutions",
                      "Description": "",
                      "Name": "AI Accelerators",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> AI Accelerators </h1>\n\n<h4 align=\"left\"> AI with ROI</h4>\n\n<p align=\"justify\">Modular data science capabilities that you can leverage to quickly prove out the ability to deliver tangible business outcomes for your enterprise with AI. </p>\n\n</br>\n\n### Catch Billing Fraud with AI Fraud Detection\n\n![1-1](https://www.kaviglobal.com/wp-content/uploads/2020/12/1-1.jpg \"1-1\")\n</br>\n\n\n\n\nApply AI to identify fraud in billing data, flagging them for reclaim and prevention of systemic revenue leakage in future.\n\n<a href=\"https://www.kaviglobal.com/software/mantis/\">Learn More </a>\n</br>\n\n### Classify Videos & Images with Computer Vision\n\n\n![2-1](https://www.kaviglobal.com/wp-content/uploads/2020/12/2-1.jpg \"2-1\")\n</br>\n\n<p align=\"justify\">Apply AI to interpret images and classify images, like MRI imaging medical analysis, and detect objects or events within images. Apply AI to interpret, process, and analyze the information acquired from videos and run several models to detect and classify objects, defects, classify anomalies, and navigate autonomous vehicles. </p>\n\n</br>\n\n### Content Management with OCR Image to Text\n\n![3-1](https://www.kaviglobal.com/wp-content/uploads/2020/12/3-1.jpg \"3-1\")\n</br>\n\n<p align=\"justify\">Apply AI to Identify information in images and translate it into text. Text is then stored in a searchable manner to be retrieved and visualized for insights at the time of need. </p>\n\n<a href=\"https://www.kaviglobal.com/solution/ai-accelerators/image-to-text-ocr/\">Learn More</a>\n</br>\n\n\n### Supply Chain Optimization with Network Analytics\n\n\n![2](https://www.kaviglobal.com/wp-content/uploads/2020/12/2.jpg \"2\")\n\n</br>\n \n<p align=\"justify\">Find out the most efficient solution to optimize the supply chain. Make smart decisions on scheduling, routing, and locations and have the right stock, in the right place, at the right levels, time and cost. </p>\n\n</br>\n\n### Customer Sentiment with Text Analytics\n\n![5-1](https://www.kaviglobal.com/wp-content/uploads/2020/12/5-1.jpg \"5-1\")\n\n</br>\n\nApply AI to determine customer sentiment from reviews to help decision makers formulate better commercial strategies. \n\n<a href=\"https://www.kaviglobal.com/solution/ai-accelerators/text-analytics/\">Learn More</a> </p>\n</br>\n\n### Smart Preventative Maintenance with IoT Streaming Analytics\n\n![6-1](https://www.kaviglobal.com/wp-content/uploads/2020/12/6-1.jpg \"6-1\")\n</br>\n\n <p align=\"justify\">Large data volume captured by IOT devices enable more possibilities for operation decision improvement such as preventive maintenance, a measurement that detects the onset of system degradation, standardize and analyze the outputs from sensors across manufacturers, and enables causal stressors to be eliminated or controlled prior to any significant deterioration in the component physical state, thereby improving operational efficiency and reducing maintenance cost. </p>\n\n</br>\n\n<h3 align=\"center\">Get Started Today! </h3>\n\n</br>\n\n<h3 align=\"left\">BYOD. All you need to do is Bring Your Own Data. </h3>\n</br>\n\n<p align=\"justify\">We will craft a personalized business case and ensure the analytical outcomes align to tangible ROI, cost savings, and business process improvement opportunities. </p>\n\n<p align=\"left\"><a href=\"https://www.kaviglobal.com/services/data-science/jumpstart-program/\">Learn More</a></p>\n\n",
                      "DisplayOrder": 4,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=ai_accelerators",
                      "Label": "ai_accelerators",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 12,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T07:26:49.095Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Solutions",
                      "Description": "",
                      "Name": "Functional Analysis",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> Functional Analytics </h1>\n</br>\n\n### Create an Intelligent Enterprise\n\n<p align=\"justify\">Functional analytics shift the focus from simply delivering data and building reports to establishing function specific data and analytics strategies to create a competitive advantage and deliver value.\n</p>\n</br>\n\n\n#### Commercial Analytics ####\n\n[![Commercial Analytics](https://www.kaviglobal.com/wp-content/uploads/2021/01/Commercial-Analytics.jpg)](https://www.kaviglobal.com/success-stories/iiot/)\n\n</br>\n\n<p align=\"justify\">Identify hidden opportunities and translate insights into income by creating new opportunities and new demand, including pricing power, survival analysis, sales planning, purchase behavior modeling, customer sentiment analysis, customer churn analysis… etc.\n</p>\n\n</br>\n\n#### Operational Analytics ####\n\n[![Operational Analytics](https://www.kaviglobal.com/wp-content/uploads/2021/01/Operations-Analytics.jpg)](https://www.kaviglobal.com/success-stories/healthcare-digital-transformation/)\n\n</br>\n\n\n<p align=\"justify\">Leverage operational data to identify bottlenecks and create action plans to continuously improve performance. Our solution tailors to each client’s industry and enable clients to make the best use of resources and enhance the visibility and profitability\n</p>\n</br>\n\n#### Financial Analytics ####\n\n\n[![Financial-Analytics](https://www.kaviglobal.com/wp-content/uploads/2021/01/Financial-Analytics.jpg)](https://www.kaviglobal.com/success-stories/iiot/)\n\n<p align=\"justify\">Optimize your portfolio, mitigate risks, and target the right direction to enhance profitability, liquidity, and stability. Benchmark the performance, identify hidden opportunities, and improve return on investment.\n</p>\n\n</br>\n\n#### Engineering Analytics\n\n[![Engineering-Analytics](https://www.kaviglobal.com/wp-content/uploads/2021/01/Engineering-Analytics.jpg)](https://www.kaviglobal.com/success-stories/healthcare-digital-transformation/)\n\n<p align=\"justify\">Proactively identify early defects in process and assets, conduct root cause analysis, and reinforce overall assets reliability to enhance quality, yield, productivity, and safety. Keep up with new demand and requirement from customers and improve profit margins.\n</p>\n\n</br>\n\n#### HR Analytics ####\n\n[![HR-Analytics](https://www.kaviglobal.com/wp-content/uploads/2021/01/HR-Analytics.jpg)](https://www.kaviglobal.com/success-stories/iiot/)\n\n<p align=\"justify\">Gaining timely access to the information from a well rounded dashboard enables HR management to know what problems employees are having, take actions immediately, and reduce turnovers.\n</p>\n\n<p align=\"left\"><a href=\"https://www.kaviglobal.com/solution/enterprise-solutions/\"> Get started today with our Enterprise Solutions </a></p>.\n\n",
                      "DisplayOrder": 3,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=functional_analysis",
                      "Label": "functional_analysis",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 11,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T05:39:46.055Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Solutions",
                      "Description": "null",
                      "Name": "Industry Solutions",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> Industry Advanced Analytics Solutions</h1>\n</br>\n\n### Are you leveraging analytics for creating a competitive advantage?\n</br>\n\n<p align=\"justify\"> We are working on analytics-of-the-future for many industries. We garner clients from a wide range of industries including transportation, healthcare, pharma, retail, higher education, banking and state government, whose operation management infrastructure and business problems vary widely. Our clients know their business and we know data management and analytics, which makes for a great partnership. Please check out some of our featured industries below.\n</p>\n\n</br>\n\n| ![icon4](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon4.jpg \"icon4\")Healthcare <p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solutions/healthcare/\">Learn More</a></p>  | ![icon7](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon7.jpg \"icon7\")Transportation \t<p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solutions/transportation/\">Learn More </a></p>  |![icon5](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon5.jpg \"icon5\")  Manufacturing  <p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solutions/manufacturing/\">Learn More </a></p> |\n| ------------ | ------------ | ------------ |\n|  ![icon8](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon8.jpg \"icon8\")**Higher Education** <p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solutions/higher-education/\">**Learn More**</a></p> | ![icon6](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon6.jpg \"icon6\")**Digital Marketing** <p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solutions/digital-marketing/\">**Learn More**</a></p>  |  ![icon9](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon9.jpg \"icon9\")**Rail** <p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solutions/data-management-and-analytics-for-railcar-fleet/\">**Learn More**</a></p>|\n\n</br>\n\n <h3 align=\"left\">Don’t See Your industry Above ? </h3>\n</br>\n\n<p align=\"justify\">Not a problem. We work in many industries beyond what is listed above. Reach out to us and we can discuss how analytics can solve your business challenges. </p>\n<a href=\"https://www.kaviglobal.com/contact-us/\">Let’s Connect!</a>\n</br>\n\n<p align=\"left\"><a href=\"https://www.kaviglobal.com/solution/functional-analytics/\">Explore Our Functional Analytics Solutions</a></p>\n\n",
                      "DisplayOrder": 2,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=industryo_solutions",
                      "Label": "industryo_solutions",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 10,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-05-04T10:58:14.332Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Solutions",
                      "Description": "null",
                      "Name": "Enterprise Solutions",
                      "ShortContent": "",
                      "FullContent": "\n<h1 align=\"center\">Enterprise Solutions</h1>\n\n</br>\n\n<img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/ES_2_1f05155dfe.JPG\" > \n</br>\n</br>\n\n\n ### Why do so many transformation efforts fail to deliver the expected results? ###\n</br>\n\n<p align=\"justify\">\nBusinesses today are under market and competitive pressures to increase innovative agility and improve customer experience using the latest technology. Without linking the business strategies of people, process, and technology, however, resources are often used on the wrong projects, low value insights are generated, and resistance to adopting new tools and practices rises. </p>\nKavi can help you avoid these pitfalls with our extensive list of Analytical Capabilities and Enterprise Solutions. </p>\n</br>\n\n### What are you trying to accomplish? ###\n\n</br>\n\n #### Get the basics down ####\n \n \n-  [Business intelligence\n](https://www.kaviglobal.com/services/businessintelligence/)   \n\n- [Migration Services](https://www.kaviglobal.com/solution/enterprise-solutions/#)\n\n- [Cloud](https://www.kaviglobal.com/services/cloud/)  \n\n\n- [Enterprise Data Foundation](https://www.kaviglobal.com/solution/enterprise-solutions/#)   \n\n- [Strategy & Roadmap](https://www.kaviglobal.com/services/strategy-roadmap/)\n\n\n\n #### Supercharge your organization with AI ####\n \n - [AI Accelerators](https://www.kaviglobal.com/solution/ai-accelerators/)  \n \n- [Data Science](https://www.kaviglobal.com/services/data-science/)   \n\n- [Enterprise AI](https://www.kaviglobal.com/kavi-labs-enterprise-ai/)\n\n\n\n#### Develop new analytical capabilities and create meaningful connections with customers ####  \n\n- [Product Development](https://www.kaviglobal.com/services/product-development/)\n\n- [AI Accelerators](https://www.kaviglobal.com/solution/ai-accelerators/)\n\n\n\n#### Get more out of existing applications ####\n\n- [Managed Services](https://www.kaviglobal.com/services/managed-services/)   \n\n- [Business Intelligence](https://www.kaviglobal.com/services/businessintelligence/)\n\n</br>\n\n<h3 align=\"center\"> Enterprise Analytics Re-architecture </h3>\n\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/ES_3_271c15c16b.JPG?updated_at=2023-04-13T10:44:53.421Z\" > </p>\n\n</br>\n\n<h4> Explore our Client Work </h4>    \n\n- Enterprise Analytics Re-architecture [Learn More](https://www.kaviglobal.com/success-stories/enterprise-analytics-re-architecture/)\n\n-  Explore our Other Client Work [Learn More](https://www.kaviglobal.com/about/success-stories/)\n\n\n#### Leverage Our Deep Experience with Industry Solutions ###\n</br>\n\n| ![icon4](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon4.jpg \"icon4\") Healthcare \t&nbsp; &nbsp; &nbsp; &nbsp;  <p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solutions/healthcare/\">Learn More</a></p>  | ![icon7](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon7.jpg \"icon7\")Transportation\t&nbsp; &nbsp; &nbsp; &nbsp; <p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solution/transportation/\">Learn More</a></p>  |![icon5](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon5.jpg \"icon5\")  Manufacturing  &nbsp; &nbsp; <p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solutions/manufacturing/\">Learn More</a></p> |\n| ------------ | ------------ | ------------ |\n</br>\n|![icon8](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon8.jpg \"icon8\") **Higher Education** <p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solutions/higher-education/\">**Learn More** </a></p> |![icon6](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon6.jpg \"icon6\") **Digital Marketing** <p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solutions/digital-marketing/\">**Learn More**</a></p>  |![icon9](https://www.kaviglobal.com/wp-content/uploads/2020/08/icon9.jpg \"icon9\") **Rail**<p align=\"center\"><a href=\"https://www.kaviglobal.com/solution/industry-solutions/data-management-and-analytics-for-railcar-fleet/\">**Learn More**</a></p> |\n\n</br>\n\n<p align=\"left\"><a href=\"https://www.kaviglobal.com/solution/functional-analytics/\">Check Out Our Analytic Solutions by Function</a></p>\n<p align=\"left\"><a href=\"https://www.kaviglobal.com/contact-us/\">Want to Learn More – Contact Us Today</a></p>\n",
                      "DisplayOrder": 1,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=enterprise_solutions",
                      "Label": "enterprise_solutions",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  }
                ]
              },
              "aboutKavi": {
                "data": [
                  
                ]
              }
            },
            {
              "id": 6,
              "Styles": "Orange",
              "Card": "Card2",
              "Label": "Kavi Labs",
              "Title": "Kavi Labs",
              "DisplayOrder": 6,
              "offerings": {
                "data": [
                  {
                    "id": 15,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-17T16:02:58.599Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "KaviLabs",
                      "Description": "",
                      "Name": "Innovation",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> Innovation as a Service</h1>\n</br>\n<h4 align=\"left\">Unleash Trapped Value</h4>\n</br>\n\n**What is an Enterprise Digital Transformation Without an Ideas Think Tank to Envision the Digital Solutions of the Future?**\n\n</br>\n<p align=\"justify\">The good news is that you can tap into us all like a service and reel your very own Innovation Lab in to foster ideas, cultivate them, transform your organization and put follow through to your projects. Our team brings together various technical and domain expertise, to bring divergent thinking to your ideation sessions.\n</p>\n\n</br>\n\n| ![1-1](https://www.kaviglobal.com/wp-content/uploads/2021/03/1-1.png \"1-1\")  |  ![2-1](https://www.kaviglobal.com/wp-content/uploads/2021/03/2-1.png \"2-1\") |  ![3-1](https://www.kaviglobal.com/wp-content/uploads/2021/03/3-1.png \"3-1\") | ![4-1](https://www.kaviglobal.com/wp-content/uploads/2021/03/4-1.png \"4-1\")  | ![5-1](https://www.kaviglobal.com/wp-content/uploads/2021/03/5-1.png \"5-1\")  |\n| :------------ | :------------ | :------------ | :------------ | :------------ |\n\n</br>\n\n![innovation](https://www.kaviglobal.com/wp-content/uploads/2021/03/innovation.png \"innovation\")\n\n</br>\n\n**[Learn More about our Product Development](https://www.kaviglobal.com/services/product-development/)**\n\n</br>\n\n**[Learn More about our Enterprise AI](https://www.kaviglobal.com/kavi-labs-enterprise-ai/)**\n  ",
                      "DisplayOrder": 2,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=innovation",
                      "Label": "innovation",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 16,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-19T14:33:19.261Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "KaviLabs",
                      "Description": "",
                      "Name": "Research",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\">Kavi Labs</h1>\n</br>\n<h3 align=\"left\"> Your Extended R&D Team</h3>\n\n<p align=\"left\">We partner with research institutions to bring innovation to experimental studies and grant funded research through big data and analytics.\n</p>\n\n\n<h3 align=\"left\"> Our Areas of Excellence</h3>\n\nKavi Labs brings innovation to research publications & grant funded research.\n\n\n<h3 align=\"center\"> Already have some data from your study?</h3>\n</br>\n\n ### Our capabilities include:\n \n ### Statistical Analysis\n\n<p align=\"justify\">Our Data Scientists can make sense of your experimental design data in meaningful ways by running various analyses from Correlations (Pearson, Spearman, Chi-Squared) to Comparison of Means (paired t-test, ANOVA) to Regressions to non-parametric tests (Wilcoxon).\n</p>\n</br>\n\n#### Data Visualization\n\n<p align=\"justify\">Our Visualization Engineers can make sense of your experimental design data in meaningful ways by looking at visualizations that makes the data more natural for the human mind to comprehend and therefore makes it easier to identify trends, patterns, relationships and outliers within large data sets.</p>\n\n<p align=\"justify\">Interactive graphical displays of data that compress data into meaningful and consumable information to generate insights are both an art and a science! Check out some insightful data visualizations that can make your research publication pop!\n</p>    \n</br>\n\n<h3 align=\"center\"> Looking for partners for new grant proposals?</h3>\n</br>\n\n### Our capabilities include:\n\n#### Grant Partners & Writers\n\n<p align=\"justify\">Our technology savvy analytical grant writers are Co-PIs on various NIH grants, and are available to ideate and innovate novel, technology and AI enabled solutions with you, to ensure your grant proposals pops! </p> </br>\n\n\n#### Data Science\n\n<p align=\"justify\">Our Data Scientists can build AI solutions to process image data (computer vision) and text data (natural language processing) meaningfully, and in an automated fashion, to enable research outcomes.</p> </br>\n\n\n#### Data Collection Applications\n\n<p align=\"justify\">Our Full Stack Application Developers will create lightweight data collection application for you to send out to all your subjects to support your research. Create your own forums or integrate with existing, validated survey tools. Data will be stored in a database available for you to access for your own analysis.</p> </br>\n\n\n<h3 align=\"center\"> Research Practice Areas </h3>\n</br>\n\n| ![1-3](https://www.kaviglobal.com/wp-content/uploads/2021/01/1-3.png \"1-3\")  |  ![2-5](https://www.kaviglobal.com/wp-content/uploads/2021/01/2-5.png \"2-5\") | ![3](https://www.kaviglobal.com/wp-content/uploads/2021/01/3-4.png \"3\")  |\n| ------------ | ------------ | ------------ |\n\n</br>\n\n<h3 align=\"center\"> Research Partnerships </h3>\n\n</br>\n\n|  ![1](https://www.kaviglobal.com/wp-content/uploads/2021/01/1-1.png \"1\") | ![2](https://www.kaviglobal.com/wp-content/uploads/2021/01/2-2.png \"2\")  |  ![3](https://www.kaviglobal.com/wp-content/uploads/2021/01/3-1.png \"3\") | ![4](https://www.kaviglobal.com/wp-content/uploads/2021/01/4.png \"4\")  | ![5](https://www.kaviglobal.com/wp-content/uploads/2021/01/5.png \"5\")  | ![6](https://www.kaviglobal.com/wp-content/uploads/2021/01/6.png \"6\")  | ![7](https://www.kaviglobal.com/wp-content/uploads/2021/01/7.png \"7\")  |\n| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |     \n\n</br>\n\n<h3 align=\"left\"> Spotlight: Lurie’s Children’s Hospital </h3>\n</br>\n\n<p align=\"left\">We partnered with Lurie’s to develop visual analytics for adolescent pain management post invasive surgeries including pectus excavatum, nuss procedures and appendectomies.</p>\n\n<p align=\"left\">Our team created novel approaches to visualize and understand pain using time series clustering and descriptive analytics to drive actionable clinical recommendations to manage patient’s pain.</p>\n</center>\n\n<p align=\"left\"><a href=\"https://www.kaviglobal.com/news/kavi-global-announces-research-partnership-with-ann-robert-h-lurie-childrens-hospital-of-chicago/\">View Press Release</a></p>\n\n\n\n<p align=\"left\"><a href=\"https://www.sciencedirect.com/science/article/abs/pii/S1524904221000345\">Children’s Pain at Home After Laparoscopic Appendectomy</a></p>\n\nRenee C.B.Manworren, Ph.D.1; Jessica Cooper, M.S.N.; Trishla Mishra, M.S.; Naomi Kaduwela, M.S.\n\n\n<p align=\"left\"><a href=\"https://www.sciencedirect.com/science/article/abs/pii/S1524904221000564?dgcid=author\">Children's Opioid Use at Home After Laparoscopic Appendectomy</a></p>\n\nRenee C.B.Manworren, Ph.D., APRN, PCNS, AP-PMN, FAAN; Naomi Kaduwela, M.S.; Trishla Mishra, M.S.; Jessica Cooper M.S.N., APRN, CPNP.\n</br>\n\n#### Past & Upcoming Conferences\n</br>\n\n<p align=\"center\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/R1_ed363f5f23.JPG\" > </p>\n\n<p align=\"left\"><a href=\"https://www.kaviglobal.com/about/thought-leadership/\">Our Thought Leadership</a></p>\n\n",
                      "DisplayOrder": 3,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=research",
                      "Label": "research",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 14,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T08:50:29.562Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "KaviLabs",
                      "Description": "",
                      "Name": "Enterprise AI",
                      "ShortContent": "",
                      "FullContent": " <h1 align=\"center\">Kavi Labs</h1>\n </br>\n<h3 align=\"left\"> Innovate at the Speed of Business\n</h3>\n\n\n<p align = \"justify\">As Kavi Global’s innovation arm for solution incubation, our passionate team of experts is here to help you leverage emerging technologies to drive innovation with tangible return on investment (ROI). We partner with clients to experiment and rapidly prototype predictive analytics and AI solutions to drive business outcomes. </p>\n\n\n\n<h3 align=\"left\"> Incubating AI with ROI </h3>\n\n<p align = \"justify\">Ensure your AI solution will deliver tangible return on investment (ROI) and cost savings opportunities by starting from the business problem and crafting a personalized business case of how each insight will be consumed in the operational workflow to drive actions that will result in the most impactful financial and qualitative benefits. </p>\n\n</br>\n\n|  ![1](https://www.kaviglobal.com/wp-content/uploads/2021/02/1.png \"1\") |  ![2](https://www.kaviglobal.com/wp-content/uploads/2021/02/2.png \"2\") | ![3](https://www.kaviglobal.com/wp-content/uploads/2021/02/3.png \"3\")  |  ![4](https://www.kaviglobal.com/wp-content/uploads/2021/02/4.png \"4\") | ![5](https://www.kaviglobal.com/wp-content/uploads/2021/02/5.png \"5\")  |\n| :------------: | :------------: | :------------: | :------------: | :------------: |\n| **Discover**  |**Diagnose**   | **Define**  | **Engage**  | **Deliver**  |\n| The business gap  | Performance gaps and Financial impacts  | Ideal state & Benefits driven MLP roadmap  | Build MVP & prove out benefits  | & Track prod implementation benefits ROI  |\n\n</br>\n</br>\n\n\n![slider-20](https://www.kaviglobal.com/wp-content/uploads/2021/09/slider-20.jpg \"slider-20\")\n\n</br>\n\n</br>\n\n| Human Centered  |AI Solutions   |\n| ------------ | ------------ |\n| *with Design Thinking*  | *with Tangible Business Benefits*  |\n|  By rapidly iterating with users, we ensure that AI embedded solutions are intuitive and easy to use, increasing adoption! | No-code tools, AI solution accelerators, and the latest algorithms and techniques from our R&D are available to quickly prove out value.  |\n| Don’t settle for an **MVP** (minimum viable product), get your**MLP**(minimum loveable product!)  | We will conduct experimental trials, testing a wide array of different models on your data, to determine which meets your needs & evaluation criteria best.     \n\n</br>\n<p align=\"left\"><a href=\"https://www.kaviglobal.com/contact-us/\">Get Started Today</a></p>\n\n\n![jumpstart-scaled](https://www.kaviglobal.com/wp-content/uploads/2020/11/jumpstart-scaled.jpg \"jumpstart-scaled\")\n\n</br>\n\n<h3 align=\"left\"> Special Offer </h3>\n</br>\n\n<p align=\"justify\">A Free 30-minutes Exploratory consultation \\/ Full-day, in-person diagnosis \\/ Conducted by the CEO and VP R&D \\/   Worth $5,000 in value \\/ Giving away 5 free Workshops \\/ FCFS basis \\/ Need to qualify</p>      \n<p align=\"left\"><a href=\"https://www.kaviglobal.com/kavi-labs-enterprise-ai/\">Book Appointment</a></p>\n\n</br>\n\n<h3 align=\"left\"> Browse Solutions Incubated at Kavi Labs</h3> \n</br>\n\n-  Enterprise AI\n\n      Large scale AI implementations for other Clients.  <a href=\"https://www.kaviglobal.com/about/success-stories/\">Learn More</a>\n\n \n - Functional Analytics\n \n      Business function specific Analytical Suites to build your Intelligent Enterprises. <a href=\"https://www.kaviglobal.com/solution/functional-analytics/\">Learn More</a></p>\n\n \n- AI Accelerators\n\n     AI Solution Accelerators to show quick wins of Ai with ROI for your Business. <a href=\"https://www.kaviglobal.com/solution/ai-accelerators/\">Learn More</a></p>\n\n- AI Tools of the Future\n\n    No-Code data and analytics products to enable Citizen Data Scientists to create value with speed. \n\n     <a href=\"https://advana.kaviglobal.com/\">Advana</a>\n     \n     <a href=\"https://www.kaviglobal.com/software/mantis/\">Needle</a>\n\n\n\n\n",
                      "DisplayOrder": 1,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=enterprise_ai",
                      "Label": "enterprise_ai",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  }
                ]
              },
              "aboutKavi": {
                "data": [
                  
                ]
              }
            },
            {
              "id": 7,
              "Styles": "Orange",
              "Card": "Card2",
              "Label": "Software",
              "Title": "Software",
              "DisplayOrder": 7,
              "offerings": {
                "data": [
                  {
                    "id": 18,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T09:43:16.411Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Software",
                      "Description": "",
                      "Name": "AI Anamoly Detection",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\">MANTIS </h1>   \n</br>\n\n### AI Fraud Detection\n\n</br>\n\n| ![first](https://www.kaviglobal.com/wp-content/uploads/2021/03/1-2.png \"first\")  | Let AI Identify the fraud invisible to the human eye  | ![second](https://www.kaviglobal.com/wp-content/uploads/2021/03/2-2.png \"second\")  |  Enhance your sight with AI |\n| :------------ | :------------ | :------------ | :------------ |\n</br>\n| ![third](https://www.kaviglobal.com/wp-content/uploads/2021/03/3-2.png \"third\")  | **Sight to identify Anomalous Transactions in your data**  |  ![fourth](https://www.kaviglobal.com/wp-content/uploads/2021/03/4-1-1.png \"fourth\") | **See in 3D** |\n\n</br>\n\n<p align=\"center\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/S1_001787c476.JPG\" > </p>\n\n</br>\n\n\n### An AI Named Mantis\n\n</br>\n\n#### Mantises are the only invertebrates known to see in 3D\n</br>\n\n<p align=\"justify\">Our AI solution looks at the data in various dimensions, in ways that the human eye alone is not able to see. AI powered sight will aid you in identifying anomalous, or suspicious, transactions in your data, after analyzing large volumes (millions of records) of historical data. </p>\n\n</br>\n\n ### What is Anomaly Detection?\n</br>\n\n<p align=\"justify\">Anomaly detection is a way to capture suspicious events, which differ significantly from the majority of the data. Detecting anomalies can help automate auditing transactions for fraud, to support reclaim efforts and enable preventive actions going forward.</p>\n\n<p align=\"justify\">This technology is getting more and more popular as fraud remains a serious issue across industries and the traditional methods can not adapt to the changes over time.</p>\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/M1_8f35b5ff4d.JPG\"> </p>\n</br>\n\n### AI is the new solution to these old problems\n\n</br>\n\n<h3 >Why do we need AI for Fraud Detection? </h3>\n</br>\n\n<h3 align=\"center\"> Humanly Not Possible </h3>\n</br>\n\n\n|  Data Volume and Complex Patterns | Time-Consuming   | Adapt to New Changes   |\n| :------------: | :------------: | :------------: |\n| <p align=\"left\">Due to data flood and the complexity of fraud patterns, humans provoke excessive false positives and overlook false negatives. Contextual and Collective anomalies patterns are also very difficult to notice with the human eye.  | <p align=\"left\"> If even 10% of 10 million annual expenses are marked problematic, that means a million expense line items would need to be investigated by the compliance team annually.  | <p align=\"left\"> While humans usually look for known patterns, AI machine learning can adapt to new changes over time, search for unknown patterns, and keep up with anomalies.</p> |\n\n</br>\n</br>\n\n<img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/M2_ddf2eafccc.JPG\">\n</br>\n</br>\n\n\n<h3 align = \"center\"> AI with RO  </h3>\n</br>\n\n<h3 align=\"center\"> Yields immediate tangible financial benefits </h3>\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/M3_20abd11838.JPG\"> </p>\n\n\n<h3 align=\"center\"> AI Fraud Detection automatically monitors your estimates and/or paid invoices to save you money </h3>\n</br>\n\n<h3 align=\"center\">Why Mantis </h3>\n</br>\n\n#### Wizard driven, no-code software \n\n<p align=\"justify\">Leverage state of art machine learning models using a simple, guided user interface. This solution abstraction away from coding, enables Citizen Data Scientists in organizations to automate audits with machine learning. </p>\n</br>\n\n#### Identify Invisible Anomaly Signatures\n\n<p align=\"justify\">Mantis flags anomaly that is invisible to human eyes due to the data flood and complex patterns. Stop recurring fraudulent transactions at a batch level and prevent blind spots, guiding users with interpretable, quantified results to further investigation. </p> </br>\n\n\n#### \tActor & actor-to-actor flagging\n\n<p align=\"justify\">Fraud is usually committed by multiple actors and factors at the same time, and we are not only able to catch a single fraudulent actor, but also the collusion between actors, such as repair billing fraud, inventory return abuse, non-rendered services, duplicate charges, collusion of doctor-patient/doctor pharmacies, fake shops/vendors conspiracy, in addition to identifying anomalous patterns for an actor or transaction level. </p> </br>\n\n\n#### Dynamically Adjusts to Fraud\n\nUtilize different algorithms based on various scenarios and assumptions to catch anomaly in different dimensions.\n</br>\n</br>\n\n<h3 align=\"center\">Citizen Data Scientists </h3>\n</br>\n\n<p align=\"justify\">Whether your business has an audit team or not, Mantis enables users to leverage a wizard driven machine model configurator to guide you in building and visualizing anomalies in a consumable fashion to reduce errors. Without hiring additional data scientists, you can easily leverage AI to continuously improve internal preventive controls, mitigate regulatory risks, enhance the visibility of information, the augment quality of decision making processes, and create a culture of compliance.</p.   \n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/M4_3e8cfac080.JPG\"> </p>\n</br>\n</br>\n\n<p align=\"center\"><img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/M5_05f72ab78d.JPG\"> </p>\n</br>\n\n<h3 align=\"center\"> Use Cases </h3>\n\n</br>\n\n#### Billing Invoices Fraud\n</br>\n\n![billing](https://kaviglobal.com/wp-content/uploads/2020/12/billing.jpg \"billing\")\n\n<p align=\"justify\">As the global supply chain complexity increases, so does the flow of goods, money, and the information among business entities. Providing visibility to upstream transactions that involve suppliers and logistic providers in a more efficient manner, and managing them in a timely and automated way, has become a challenge for every company. Enhancing the visibility of the flow of goods, money, and the information between business entities, from the shipment to the transaction receipts, is the first step to prevent any potential disruption.</p>\n\n<p align=\"justify\">Our AI solution is able to flag fraudulent transactions and conspiracy of fraudulent actors, such as asset repair bill fraud, inventory return abuse, fake shops/vendors collusion, and duplicate charges, efficiently and automatically.</p>\n</br>\n\n\n#### Pharma & Healthcare Billing Fraud, Waste & Abuse\n</br>\n\n![Pharma](https://kaviglobal.com/wp-content/uploads/2020/12/Pharma.jpg \"Pharma\")\n\n\n<p align=\"justify\">According to the National Health Care Anti-Fraud Association, 3%-10% health care spending is fraudulent (up to $300B). In fiscal 2019, the Department of Justice recovered more than US$2.6 billion claims relating to the healthcare industry out of US$3 billion from civil cases involving fraud and false claims against the government. There is no precise measure of healthcare fraud waste and abuse, as we will never really know how many we missed out via false negatives, or accidently classifying fraud and not fraudulent.</p>\n\n<p align=\"justify\">Our AI solutions will highlight fraudulent transactions and actors, as well as the collusion of multiple fraudulent actors, such as doctor-pharmacists and doctors-patients conspiracy, instead of simply catching systemic fraud patterns at a batch transaction level and flagging a single actor.</p>\n</br>\n\n#### Anti-Money Laundering (AML)\n</br>\n\n![Anti-Money-1](https://kaviglobal.com/wp-content/uploads/2020/12/Anti-Money-1.jpg \"Anti-Money-1\")\n\n\n\n<p align=\"justify\">Banks in the U.S. spend more than US $25 billion annually, on average, on anti-money laundering compliance according to Forbes. As the volumes, complexity, availability, and regulations change.</p>\n\n<p align=\"justify\">AI will adapt to new changes over time and flag recurring fraudulent actors to augment the traditional rule-based monitor systems. Instead of giving binary feedback simply based on a threshold, which may be irrelevant overtime, AI will know the likelihood of fraudulent events. Compared to other machine learning solutions in the market, the active learning AI methodology we leverage detect the anomaly patterns and flag fraudulent actor collusion with high accuracy.</p>\n</br>\n\n#### Insurance Fraud\n</br>\n\n![Insurance-Fraud](https://kaviglobal.com/wp-content/uploads/2020/12/Insurance-Fraud.jpg \"Insurance-Fraud\")\n\n\n<p align=\"justify\">The total cost of insurance fraud, excluding health insurance, is estimated to surpass $40 billion annually, according to the FBI. Insurance Research Council (IRC) also estimated that up to $7.7 billion of auto injury claims was excessive payments in 2012, accounting for 13%-17% of the total payments of 5 main private passenger auto injury coverages.</p>\n\n<p align=\"justify\">Traditional anomaly detection technology in the insurance industry identifies anomalies by fitting them into a preprogrammed template. As transactions get more and more complicated, so does the fraud. A proactive approach is needed to adapt to new fraud patterns and perform dynamic analysis. AI is the only feasible solution that can keep up with anomaly detection and flag recurring fraudulent actors and transactions, when fraud is continuously adapting over time.</p>\n</br>\n\n\n#### Supply Chain Sourcing, Production, & Quality Defects\n</br>\n\n![Supply-Chain](https://kaviglobal.com/wp-content/uploads/2020/12/Supply-Chain.jpg \"Supply-Chain\")\n\n\n<p align=\"justify\">The more components and processes in the production line, the greater the remake time and costs. For example, if we require 50% yield rate of the final product, we only need 50% of yield rate of the work-in-progress, if there is only 1 part needed to finish the production. However, if we need 10 parts to assemble the final product, then 93.3% of yield rate is required for each part, to maintain the 50% yield rate for the final product. However, 50% yield is unacceptable to most companies. Revealing the root cause of defects in each manufacturing process to enhance the yield is one of the most inexpensive ways to guarantee the quality, shorten the lead-time, and stabilize the supply chain.</p>\n\n<p align=\"justify\">AI can easily detect whether the outliers derive from the nature of process, human factors, machine factors, time factors, or environment factors, enabling stressors to be eliminated or controlled prior to any significant financial impact, and help you to identify improvement opportunities to achieve Six Sigma (3.4 defects per million, 99.99966%). This technology can also be applied to assist in making sourcing decisions. If there is a significant fluctuation in certain material prices in particular time or regions, maybe it is time for the sourcing department to investigate the reason and make a plan B.</p>\n</br>\n\n#### Government\n</br>\n\n![Government](https://kaviglobal.com/wp-content/uploads/2020/12/Government.jpg \"Government\")\n\n<p align=\"justify\">According to McKinsey & Company’s estimate, the U.S. government suffers a US$150 billion dollars loss due to potential fraud annually, half of which goes undetected, and our AI anomaly detection solution enables the government to stop the revenue leakage in many ways. For example, the algorithms can easily identify the concentration of payments based on the geographic and demographic data the government has, thereby capturing the suspicious groups in suspicious regions. For another example, the government can utilize the technology to monitor any significant changes in the financial behaviors/status of tax and debt payers to forecast the possibility of insolvency. Due to data flood and the complexity of anomaly patterns, it is inefficient for humans to reveal these patterns and determine the hidden links between fraudulent actors.</p>\n</br>\n\n\n#### Pharmacy Claims Fraud Detection\n</br>\n\n![ss](https://kaviglobal.com/wp-content/uploads/2021/01/ss.jpg \"ss\")\n\n[Read Client Success Story](https://www.kaviglobal.com/success-stories/pharmacy-claims-fraud-detection/)\n\n#### AI enabled audits on Transportation Equipment Repair Bill\n</br>\n\n![AI ](https://kaviglobal.com/wp-content/uploads/2021/02/Untitled-2.jpg \"AI \")\n\n[Read Client Success Story](https://www.kaviglobal.com/success-stories/ai-enabled-audits-on-transportation-equipment-repair-bill/)\n\n\n\n[Watch one of our Kavi Experts delivering a presentation on \nPharmacy Claims Fraud Detection using Apache Spark at \nthe Spark+AI Summit,SFO, JUNE 2018.](https://www.youtube.com/watch?v=8Yv0e8Clj94)\n",
                      "DisplayOrder": 1,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=ai_anamoly_detection",
                      "Label": "ai_anamoly_detection",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 17,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T08:54:14.410Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Software",
                      "Description": "",
                      "Name": "Data Engineering & Science",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\">Advana: No-Code Enterprise Data and Analytics </h1>\n\n</br>\n\n<p align=\"justify\">\nAdvana is a next-generation no-code data engineering and data science software designed to make implementing, accelerating and scaling data analytics simpler and faster, giving you the freedom to focus on what matters most to you: solving your business problems.</p>\n</br>\n\n  [Request Demo](https://advana.kaviglobal.com/)             \n  \n  [Contact Us](https://advana.kaviglobal.com/) \n \n</br>\n\n### Designed to meet all your data analytics needs\n\n<p align=\"justify\">Advana includes a wide range of data analytics capabilities and features that allows you to transform,\nmanage and analyze your data effectively and efficiently.</p>\n</br>\n\n| <p align=\"center\"> ![big data](https://advana.kaviglobal.com/wp-content/uploads/2020/10/big-data-3.png \"big data\") </p> | <p align=\"center\"> ![deep-learning](https://advana.kaviglobal.com/wp-content/uploads/2020/10/deep-learning.png \"deep-learning\")| <p align=\"center\">  ![machine-learning](https://advana.kaviglobal.com/wp-content/uploads/2020/10/machine-learning.png \"machine-learning\") |\n| :------------: | :------------: | :------------: |\n| **Data Engineering (DE) Standard Edition**  | **Data Engineering (DE) Premium Edition**  | **Data Science (DS) Machine Learning Edition**  |\n| <p align=\"left\">Standard Edition includes Data Ingestion, Data Transformation, Orchestration and Administration Functionalities. </p> |<p align=\"left\"> In addition to the capabilities of the Standard Edition, the Premium Edition includes Data Catalog, Business Rules and Data Quality.</p>  | <p align=\"left\"> Machine Learning provides the users functionality to train and score a comprehensive collection of machine learning algorithms.</p> |\n\n<p align=\"left\"><a href=\"https://advana.kaviglobal.com/capabilities/\">View full feature list </a></p>\n</br>\n\n### Delivers sustainable benefits to your organization\n</br>\n\n![Group-1056](https://advana.kaviglobal.com/wp-content/uploads/2020/10/Group-1056.png \"Group-1056\")  **Modernize and your legacy data analytics solutions.**\n\n\n![Group-1057](https://advana.kaviglobal.com/wp-content/uploads/2020/10/Group-1057.png \"Group-1057\")   **Deliver business value faster and cheaper leveraging no-code paradigm.**\n\n\n![Group-1058](https://advana.kaviglobal.com/wp-content/uploads/2020/10/Group-1058.png \"Group-1058\") **Retain talent with domain expertise while compute technology choices evolve.**\n\n\n![Group-1059](https://advana.kaviglobal.com/wp-content/uploads/2020/10/Group-1059.png \"Group-1059\") **Collaborate across business functions and IT seamlessly in a common user interface.**\n\n\n![XMLID_1336_-2](https://advana.kaviglobal.com/wp-content/uploads/2020/11/XMLID_1336_-2.png \"XMLID_1336_-2\") **Protect your solutions from compute technology version upgrades.**\n\n\n![Group-1061](https://advana.kaviglobal.com/wp-content/uploads/2020/10/Group-1061.png \"Group-1061\") **Enable solution development in a new technologies without acquiring new coding skills.**\n\n\n![Group-1062](https://advana.kaviglobal.com/wp-content/uploads/2020/10/Group-1062.png \"Group-1062\") **Port your solutions to new technologies effortlessly as and when they become available.**\n\n\n![Group-1063](https://advana.kaviglobal.com/wp-content/uploads/2020/10/Group-1063.png \"Group-1063\")  **Deploy solutions across a variety of available compute technologies simultaneously.**\n\n\n![solution](https://advana.kaviglobal.com/wp-content/uploads/2020/11/solution.png \"solution\") **Toggle your solutions from one compute technology to another with few clicks.**\n\n<p align=\"left\"><a href=\"https://advana.kaviglobal.com/about-advana/user-centric/\">Read more about Advana </a></p>\n\n### Take a look at additional resources\n</br>\n\n Northwestern Data Scientists Favor Advana (formerly Plexa) Over Hand Coding.\n \n http://www.prweb.com/releases/northwestern_data_scientists_favor_plexa_over_hand_coding/prweb17063406.htm \n\nKavi Global launches Advana – its Machine Learning Software as a Service. \n\nhttps://www.prweb.com/releases/2018/02/prweb15183663.htm\n\nKavi Labs Opens Doors to Aspiring Innovators and Entrepreneurs.   \n\nhttps://www.prweb.com/releases/kavi_labs_opens_doors_to_aspiring_innovators_and_entrepreneurs/prweb16898193.htm \n\n</br>\n\n<p align=\"left\"><a href=\"https://advana.kaviglobal.com/\">Request Demo </a></p>\n\n<p align=\"left\"><a href=\"https://www.kaviglobal.com/wp-content/uploads/2021/02/Advana-UserManual.pdf\">Advana User Manual</a></p>\n\n</br>\n\n![ADVANA](https://advana.kaviglobal.com/wp-content/uploads/2020/10/cropped-Layer_x0020_1.png \"ADVANA\")\n\nAdvana is designed to satisfy the needs of its users regardless of their level of expertise in the data analytics spectrum. Advana offers each user a comprehensive set of tools to help them excel at their activities.\n\n",
                      "DisplayOrder": 2,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=data_engineering_science",
                      "Label": "data_engineering_science",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  },
                  {
                    "id": 19,
                    "attributes": {
                      "createdAt": "2023-02-22T08:29:19.918Z",
                      "updatedAt": "2023-04-20T09:46:08.921Z",
                      "publishedAt": "2023-02-22T08:45:42.287Z",
                      "OfferingType": "Software",
                      "Description": "",
                      "Name": "Data Labeling",
                      "ShortContent": "",
                      "FullContent": "<h1 align=\"center\"> Create training datasets for computer vision models with our fully-managed solution </h1>\n</br>\n\n### Video & Image Annotation\n\n</br>\n\n#### Label or categorize videos and images at scale\n\n</br>\n\n|  ![1](https://www.kaviglobal.com/wp-content/uploads/2021/03/1.png \"1\") |  ![2](https://www.kaviglobal.com/wp-content/uploads/2021/03/2.png \"2\") | ![3](https://www.kaviglobal.com/wp-content/uploads/2021/03/3.png \"3\")  | ![4](https://www.kaviglobal.com/wp-content/uploads/2021/03/4.png \"4\")  | ![5](https://www.kaviglobal.com/wp-content/uploads/2021/03/5.png \"5\")  |\n| :------------: | :------------: | :------------: | :------------: | :------------: |\n|  **Categorizations** |  **Facial Landmarking** | **Occlusion Marking**  | **Bounding Boxes**  | **Linear Scale**  |\n| Classify media with discrete survey scores  |  Move facial landmarks into proper place |  Mark areas that are obstructed from view |  Identify items of interest with one or many bounding boxes | Rate images for emotion via pre defined linear scales  |\n\n</br>\n\n<p align=\"center\"> <img src=\"https://kavistrapiappstorage.blob.core.windows.net/strapi-uploads/assets/D1_ec721c226c.JPG\" width=\"1000\" height=\"450\"> </p>\n\n</br>\n\n### Ensure Data Labeling Quality\n\n</br>\n\n- Guided data labeling workflow\n\n- Data labeling training\n\n- Inter-rater reliability checks\n\n- Intra-rater reliability checks\n\n- Optimized to minimize clicks\n\n</br>\n\n<h3 align=\"center\"> Client Work </h3>\n</br>\n\n|  ![Use-Case](https://www.kaviglobal.com/wp-content/uploads/2021/03/Use-Case.jpg \"Use-Case\") |  ![source-data](https://www.kaviglobal.com/wp-content/uploads/2021/03/source-data.jpg \"source-data\") | ![data-labeling-type](https://www.kaviglobal.com/wp-content/uploads/2021/03/data-labeling-type.jpg \"data-labeling-type\")  | ![Volume](https://www.kaviglobal.com/wp-content/uploads/2021/03/Volume.jpg \"Volume\")   |  ![Outcome](https://www.kaviglobal.com/wp-content/uploads/2021/03/Outcome.jpg \"Outcome\") |\n| :------------: | :------------: | :------------: | :------------: | :------------: |\n| **Use Case**  | **Source Data**  |  **Data Labeling Type** | **Volume**  |  **Outcome** |\n|  Data labeling or training supervised computer vision models |  Image & Video Data |  Classification, Facial Landmarks, Emotion Detection & Scoring | Thousands of images i.e. video extraction of frames every half second  |  Emotion Detection & Classification |\n\n</br>\n\n<h4 align=\"center\"> Need a custom data labeling solution?</h4>\n</br>\n<p align=\"center\"><a href=\"https://www.kaviglobal.com/contact-us/\">Get in Touch</a></p>\n \n",
                      "DisplayOrder": 3,
                      "ContentLink": "http://kavi-strapi-app.azurewebsites.net/api/offerings?populate=deep,20&filters[Label][$eq]=data_labeling",
                      "Label": "data_labeling",
                      "Image": null,
                      "Tags": {
                        "data": [
                          
                        ]
                      },
                      "ParentOffering": {
                        "data": null
                      }
                    }
                  }
                ]
              },
              "aboutKavi": {
                "data": [
                  
                ]
              }
            }
          ],
          "RightMenu": [
            {
              "id": 1,
              "Label": "Blog",
              "DisplayOrder": 1,
              "Name": "Blog",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/posts?populate=deep,20&filters[Type][$eq]=blog"
            },
            {
              "id": 2,
              "Label": "Success Stories",
              "DisplayOrder": 2,
              "Name": "Success Story",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/posts?populate=deep,20&filters[Type][$eq]=success_story"
            },
            {
              "id": 3,
              "Label": "White Paper",
              "DisplayOrder": 3,
              "Name": "White Paper",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/posts?populate=deep,20&filters[Type][$eq]=white_papers"
            },
            {
              "id": 4,
              "Label": "Publications",
              "DisplayOrder": 4,
              "Name": "Publication",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/posts?populate=deep,20&filters[Type][$eq]=publications"
            },
            {
              "id": 5,
              "Label": "Podcasts",
              "DisplayOrder": 5,
              "Name": "Podcast",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/posts?populate=deep,20&filters[Type][$eq]=podcasts"
            },
            {
              "id": 6,
              "Label": "Conferences",
              "DisplayOrder": 6,
              "Name": "Conference",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/posts?populate=deep,20&filters[Type][$eq]=conferences"
            },
            {
              "id": 7,
              "Label": "Magazines",
              "DisplayOrder": 7,
              "Name": "Magazine",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/posts?populate=deep,20&filters[Type][$eq]=magazines"
            },
            {
              "id": 8,
              "Label": "News",
              "DisplayOrder": 8,
              "Name": "News",
              "ContentLink": "https://kavi-strapi-app.azurewebsites.net/api/posts?populate=deep,20&filters[Type][$eq]=news"
            }
          ]
        }
      },
      "meta": {
        
      }
    }
   */ 
/*    let LeftMenu: any = cloneDeep(this.menuData?.LeftMenu);
    this.leftMenuCardOne = LeftMenu.filter((element: any) => element.Card === 'Card1');
    this.leftMenuCardTwo = LeftMenu.filter((element: any) => element.Card === 'Card2');
 /*   console.log("menuData",this.menuData);
    console.log("LeftMenu",LeftMenu);
    console.log("this.leftMenuCardOne",this.leftMenuCardOne);
    console.log("this.leftMenuCardTwo",this.leftMenuCardTwo);*/
   let menu :any=[];
   let keyItem :any=[];
    this.menuData[0]?.LeftMenu.forEach((item: any,index:number,key:Object) => {
      keyItem.push(index);     
      var obj={
        [index]:item
      }
      menu.push(obj);
    });    
    this.keyList = keyItem;
    this.OfferingList = menu; 
//    console.log("menu",menu);
  }

  public makeMenuActive(menuItem?: any) {
//    console.log("menuItem",menuItem);
    this.showMenu = false;
    this.document.body.classList.remove('hide-scroll'); 
    if (menuItem) {
      if(menuItem == 'ContactUs'){
      this.commonService.activeMenuName = 'ContactUs';
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
      }
      else if(menuItem == 'Careers'){
  //    this.commonService.activeMenuName = 'Careers';
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
      
      }
      else if(menuItem == 'SearchTag' || menuItem == 'UserForm'){
      this.commonService.activeMenuName = this.searchTagValue;
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
      }
/*      else if(menuItem == 'UserForm'){
        this.commonService.activeMenuName = this.searchTagValue;
        setTimeout(() => {
          this.commonService.routeChangeSubscription.next(true);        
        }, 100);
        }*/
      else{
        this.commonService.activeMenuName = menuItem?.attributes?.Parameter?.type;  
        this.commonService.activeMenuData =  menuItem;
  //    this.commonService.activeMenuName = menuItem.Label;      
      this.makeMenuList();
 //     console.log("activeMenuName",this.commonService.activeMenuName);  
        setTimeout(() => {
          this.commonService.routeChangeSubscription.next(true);        
        }, 100);
      }         
    }
    else {
      this.commonService.activeMenuName = '';
      this.router.navigate(['/']);
    }
  }
  public emailSubscription(email:any){    
    let emailValidation = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
    let valid = emailValidation.test(email);
    if(valid){
      //call API
      this.rightMenuService.emailSubscription(email).then((response: any) => {
        if(response.data){
          this.isSubscribed = true
        }
        else
          this.isSubscribed = false
      })
    }
    else{
      //error message
      this.isSubscribed = false
    }
    console.log(valid);
    
  }
  public makeOfferingsActive(menuItem?: any,selectedMenu?: any,menuType?:any) {
//console.log("xxxx",menuItem,menuType);
    this.showMenu = false;    
    this.document.body.classList.remove('hide-scroll');    
/*    if (menuItem?.offerings?.data && menuItem?.offerings?.data?.length > 0 
    ) {    
      menuItem.offerings.data.forEach((item: any) => {
        if(item.attributes['Label'] == selectedMenu){
          this.commonService.activeMenuName = selectedMenu;
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
        }
      });
      
    }
    else if (menuItem?.aboutKavi?.data && menuItem?.aboutKavi?.data?.length > 0)
    {    
      menuItem.aboutKavi.data.forEach((item: any) => {
        if(item.attributes['Label'] == selectedMenu){
          this.commonService.activeMenuName = selectedMenu;
      setTimeout(() => {
        this.commonService.routeChangeSubscription.next(true);        
      }, 100);
        }
      });      
    }*/
    if(menuItem?.attributes?.Parameter?.type){
      this.commonService.activeMenuName = selectedMenu;
      this.commonService.activeMenuData = menuItem;
      this.makeMenuActive(menuItem);
      this.router.navigate(["/"+menuItem?.attributes?.Parameter?.type+"/"+selectedMenu]);
    }
    else {
      this.commonService.activeMenuName = '';
      this.router.navigate(['/']);
    }
  }

requestForm(){ 
  this.makeMenuActive('UserForm'); 
  this.router.navigate(["/UserForm"]); 
}

searchTag(searchText:any){ 
 if(searchText.value == ''){
 }
 else{
  this.searchTagValue = searchText.value;
  this.makeMenuActive('SearchTag');  
  searchText.value='';
  this.router.navigate(["/SearchTag="+this.searchTagValue]);
 }
}

  toggleDiv() {
    this.showMenu = !this.showMenu;
    this.document.body.classList.remove('hide-scroll');
    if (this.showMenu) {
      this.document.body.classList.add('hide-scroll');
    }
  }


}


