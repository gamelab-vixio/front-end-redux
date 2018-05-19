import React, { Component } from 'react';

import TextareaAutosize from 'react-autosize-textarea';
import FaPlus from 'react-icons/lib/fa/plus';

class Create extends Component {

   constructor(props) {
      super(props);
      this.state = {
         data: [{
            name: "Beginning",
            paragraphs:[
               {
                  content:'Welcome to create story',
                  choices:[],
                  links:[]
               }
            ]
         }],
         isLoading: true,
         choiceInput: '',
         isToggle: false
      };

      this.editParagraphText = this.editParagraphText.bind(this);
      this.addChoice = this.addChoice.bind(this);
      this.deleteChoice = this.deleteChoice.bind(this);
   }

   componentWillMount() {
      /*this.addSection('Section 2');
      this.addParagraph(1);*/
      // this.editParagraphText(1, 0, 'Paragraph 1');
      // this.addChoice('Go to P2');
      // this.editLink(1, 0, 0);
      // this.addParagraph(1);
      // this.editParagraphText(1, 1, 'Paragraph 2')
      // this.addChoice('Go to P3');
      // this.addChoice('Go to P4');
      // this.editLink(1, 1, 0);
      // this.editLink(1, 1, 1);      
      // this.addSection('Climax');
      // this.addParagraph(2);
      // this.addParagraph(2);
      // this.editParagraphText(2, 0, 'Paragraph 3');
      // this.editParagraphText(2, 1, 'Paragraph 4');
      // this.inkResult();
      this.setState({
         isLoading: false
      })
   }

   getLinks(p){
      let data = this.state.data;
      let res = false;
      data.forEach(function(section, i){
         if(i === p['section']){
            res = section['name']+".p"+p['paragraph'];
         }
      });
      if(!res) res = "END";

      this.setState({
         data: data,
         isLoading: false
      }, () => {
         console.log(data);
      });

      return res;
   }

   inkResult(){
      let data = this.state.data;
      let knot = "->" + data[0].name + ".p0\n";

      data.forEach(function(section, i){
         knot+= "=== "+section['name']+"\n";
         section['paragraphs'].forEach(function(paragraph, j){
            knot+="\t= p"+j+"\n";
            knot+="\t"+paragraph['content']+"\n";
            if(paragraph['links'].length === 0){
               knot+="\t->END\n";
            }
            for (let k = 0; k <= paragraph['choices'].length - 1; k++) {
               knot+="\t* "+paragraph['choices'][k]+"\n";
               let res = false;
               let p = paragraph['links'][k];
               data.forEach(function(section, i){
                  if(i === p['section']){
                     res = section['name']+".p"+p['paragraph'];
                  }
               });
               if(!res){
                  res = "END";
               }

               let link = res;
               knot+="\t->"+link+"\n";
            }
         });
      });

      this.setState({
         data: data,
         isLoading: false
      }, () => {
         console.log(knot);
      })


      // console.log(knot);
   }

   /******************************* SECTION (START) *******************************/
   addSection(newSection){
      let exist = true;
      for(let i = 0; i < this.state.data.length; i++) {
         if(newSection === this.state.data[i]['name']){
            alert("Section named "+ newSection + " is already there");
            exist = false;
         }
      }

      if(exist) {
         let newArray = this.state.data;
         newArray.push({
            name: newSection,
            paragraphs: []
         })

         this.setState({
            data: newArray,
            isLoading: false
         }, () => {
            // console.log(this.state.data);
         })
      }

      console.log(this.state.data);
   }

   editSection(oldSectionIndex, newSection){
      let data = this.state.data;
      let exist = true;
      data.forEach(function(item, i){
         if(newSection === item['name']){
            alert("Section named "+ newSection + " is already there");
            exist = false;
         }
      });

      if(exist){
         data[oldSectionIndex]['name'] = newSection;
         this.setState({
            data: data,
            isLoading: false
         }, () => {
            // console.log(this.state.data);
         })
      }
   }

   deleteSection(sectionIndex){
      if(sectionIndex !== 0) {
         let data = this.state.data;
         //change link
         let upperSectionLength = data[sectionIndex-1]['paragraphs'].length;
         data[sectionIndex]['paragraphs'].forEach(function(item, i){
            item['links'].forEach(function(link, j){
               if(link.hasOwnProperty('paragraph') && link['section'] === sectionIndex){
                  link['paragraph']+=upperSectionLength;
                  link['section'] = sectionIndex-1;
               }
            });
         });

         //splicing
         let selectedSection = data[sectionIndex]['paragraphs'];
         selectedSection.forEach(function(item, i){
            data[sectionIndex-1]['paragraphs'].push(item);
         });

         data.splice(sectionIndex, 1);

         this.setState({
            data: data,
            isLoading: false
         }, () => {
            console.log(data);
         });

      }
      else{
         alert("First section cannot be deleted");
      }
   }

   addParagraph(sectionIndex){
      let data = this.state.data;

      data[sectionIndex]['paragraphs'].push({
         content: "",
         choices: [],
         links:[]
      });
      
      this.setState({
         data: data,
         isLoading: false
      }, () => {
         console.log(data);
      });

      let newParagraph = {
         section: sectionIndex,
         paragraph: data[sectionIndex]['paragraphs'].length - 1
      }

      return newParagraph;
   }

   deleteLastCreatedParagraph(){
      let data = this.state.data;

      let lastSectionIndex = data.length - 1;
      let lastParagraphIndex = data[lastSectionIndex]['paragraphs'].length - 1;
      let newParagraphIndex;
      let beforeLastParagraph;

      data[lastSectionIndex]['paragraphs'].splice(lastParagraphIndex, 1);
      
      if(lastParagraphIndex <= 0){
         data.splice(lastSectionIndex, 1);
         lastSectionIndex = data.length - 1;
         newParagraphIndex = data[lastSectionIndex]['paragraphs'].length - 1;
      }else{
         newParagraphIndex = lastParagraphIndex - 1;
      }

      beforeLastParagraph = data[lastSectionIndex]['paragraphs'][newParagraphIndex]['links'];

      beforeLastParagraph.forEach(function (link, i){
         if(link['paragraph'] === lastParagraphIndex && link['section'] === lastSectionIndex){
            beforeLastParagraph[i] = {section: "END"};
            return;
         }
      });

      this.setState({
         data: data,
         isLoading: false
      }, () => {
         console.log(data);
      });
   }

   editParagraphText(sectionIndex, paragraphIndex, e){
      let contentText = e.target.value;

      let data = this.state.data;
      data[sectionIndex]['paragraphs'][paragraphIndex]['content'] = contentText;
      
      this.setState({
         data: data,
         isLoading: false
      }, () => {
         console.log(data);
      });
   }

   /******************************* PARAGRAPH (END) *******************************/

   /******************************* CHOICES (START) *******************************/
   addChoice(choiceText){
      let data = this.state.data;
      let sectionIndex = data.length - 1;
      let paragraphIndex = data[sectionIndex]['paragraphs'].length - 1;

      data[sectionIndex]['paragraphs'][paragraphIndex]['choices'].push(choiceText);
      data[sectionIndex]['paragraphs'][paragraphIndex]['links'].push('END');

      this.setState({
         data: data,
         isLoading: false
      }, () => {
         console.log(data);
      });
   }

   editChoice(sectionIndex, paragraphIndex, choiceIndex, e){
      let choiceText = e.target.value;

      let data = this.state.data;

      data[sectionIndex]['paragraphs'][paragraphIndex]['choices'][choiceIndex] = choiceText;

      this.setState({
         data: data,
         isLoading: false
      }, () => {
         console.log(data);
      });
   }

   deleteChoice(sectionIndex, paragraphIndex, choiceIndex){
      let data = this.state.data;
      console.log(data[sectionIndex]['paragraphs'][paragraphIndex]['choices'])
      console.log(data[sectionIndex]['paragraphs'][paragraphIndex]['choices'][choiceIndex])
      console.log('heelo ',sectionIndex+' '+paragraphIndex+' '+choiceIndex);

      data[sectionIndex]['paragraphs'][paragraphIndex]['choices'].splice(choiceIndex,1);
      data[sectionIndex]['paragraphs'][paragraphIndex]['links'].splice(choiceIndex,1);
      
      console.log(data[sectionIndex]['paragraphs'][paragraphIndex]['choices'])
      this.setState({
         data: data,
         isLoading: false
      }, () => {
         console.log(data);
      });

      console.log("thisState" , this.state.data)
   }

   /******************************* CHOICES (END) *******************************/

   /******************************* LINKS (START) *******************************/
   editLink(sectionIndex, paragraphIndex, choiceIndex, linkSection = null, linkParagraph = null){
      //1. link to new paragraph
      let data = this.state.data;
      let linkText;

      if(linkSection == null) {
         let newParagraph = this.addParagraph(sectionIndex);
         linkText = {section: newParagraph['section'], paragraph: newParagraph['paragraph']};
      }
      //link to existing paragraph
      else {
         linkText = {section: linkSection, paragraph: linkParagraph};
      }

      data[sectionIndex]['paragraphs'][paragraphIndex]['links'][choiceIndex] = linkText;

      this.setState({
         data: data,
         isLoading: false
      }, () => {
         console.log(data);
      });
   }

   deleteLink(sectionIndex, paragraphIndex, choiceIndex){
      let data = this.state.data;

      data[sectionIndex]['paragraphs'][paragraphIndex]['links']['choiceIndex'] = 'End';

      this.setState({
         data: data,
         isLoading: false
      }, () => {
         console.log(data);
      });
   }

   renderStory() {
      let renderData = this.state.data.map((section, index) => {

         return(
            section.paragraphs.map((paragraph, p_index) => {

               return (
                  <div key={index+''+p_index} className="section-block">
                     <div className="col-md-12 section-wrapper">
                        <div className="section-title-wrapper">
                           <h1 className="section-title">{section.name}</h1>
                        </div>
                        <div className="paragraph-wrapper">
                           <TextareaAutosize className="paragraph" rows={5} placeholder={paragraph.content} onChange={(e) => this.editParagraphText(index, p_index, e)} autoComplete="off" />
                        </div>   
                        {
                           paragraph.choices.map((choice, c_index) => {
                              return(
                                 <div key={index+''+p_index+''+c_index} className="choices-wrapper animated fadeIn">
                                    <label htmlFor="option-1">option {c_index + 1} :</label>
                                    <TextareaAutosize className="choices" rows={1} placeholder="Write your option here" value={choice} onChange={(e) => this.editChoice(index, p_index, c_index, e)} autoComplete="off" />
                                    <button className="btn delete-option-button" onClick={() => this.deleteChoice(index, p_index, c_index)}><FaPlus size={15}/></button>
                                    <button className="btn add-link-button">add link</button>
                                 </div>
                              )
                           })
                        }
                        <button className="btn add-option-button" onClick={() => this.addChoice('')}><FaPlus size={15}/> option</button>
                     </div>
                     <div className="section-link-wrapper">
                        <div className="section-link"></div>
                     </div>
                  </div>
               )
            })
         )
      });

      return renderData;
   }

   render() {
      if(!this.state.isLoading) {

         return (
            <div className="container-fluid create animated fadeIn">
               <div className="row no-gutters">
                  <div className="col-12 col-sm-12 col-md-12">
                     <h1 className="create-title">create story</h1>
                     <hr className="styled-line"/>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 offset-md-3">
                     <div className="row no-gutters">
                        <div className="col-md-12 create-read">
                           {this.renderStory()}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         );
      }
      else {
         return('')
      }
   }
}

export default Create;