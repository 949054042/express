<script>
    $(document).ready(function(){
        var timer;
        setMenu('business', {$type});
        delattach()
        delet()
        remove_red()
        translate2()
        clear()
        function delattach(){
            $('.delattach').click(function(){
                var id = $(this).attr("data-atid");
                $(this).prev().remove()
				$(this).remove();
                $.post('{#link}business/invoice/dodelattach', {id: id},
                        function (result) {
                            //layer.msg('ɾ����');
                            //window.location.reload();
                        }
                    );
            })
        }
		/*�ݸ���*/
        function draft(){
            console.log("draft")
            var target=$("#oaid").val();
            if(target)
            {
                var draf=$("#draft");
                draf.css({
                    display:"inline-block"
                });

                //��ƱĬ�����Ƴ�
                $('#trinvoice').remove();
                //��Ԥ��Ĭ�����Ƴ�
                $('#trpayment').remove();
                //�Ƴ��ո���
                $('.attachfiles').remove()
                //������ʾ
                $('.attachfilesdisplay').css('display','flex')
            }
        }
        //GBP ��ǰ����
        function select2(){
            var case2=$(".case");
            case2.each(function(m,n){
                var text=$(this).find("input:text");
                var check=$(this).find("input:checkbox");
                text.attr("disabled",true);
                text.addClass("disabled");
                check.bind("click",function(ev){
                    if(this.checked==true)
                    {
                        text.attr("disabled",false);
                        text.removeClass("disabled")
                    }
                    else
                    {
                        text.attr("disabled",true);
                        text.addClass("disabled")
                    }
                })
            })
        }
        //������ɴ�д
		/*****************/
        //���Զ����������齨
        //������ɴ�д
        function digitUppercase(n){
            var fraction = ['��', '��'];
            var digit = [
                '��', 'Ҽ', '��', '��', '��',
                '��', '½', '��', '��', '��'
            ];
            var unit = [
                ['Ԫ', '��', '��'],
                ['', 'ʰ', '��', 'Ǫ']
            ];
            var head = n < 0 ? 'Ƿ' : '';
            n = Math.abs(n);
            var s = '';
            for (var i = 0; i < fraction.length; i++) {
                s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/��./, '');
            }
            s = s || '��';
            n = Math.floor(n);
            for (var i = 0; i < unit[0].length && n > 0; i++) {
                var p = '';
                for (var j = 0; j < unit[1].length && n > 0; j++) {
                    p = digit[n % 10] + unit[1][j] + p;
                    n = Math.floor(n / 10);
                }
                s = p.replace(/(��.)*��$/, '').replace(/^$/, '��') + unit[0][i] + s;
            }
            return head + s.replace(/(��.)*��Ԫ/, 'Ԫ')
                    .replace(/(��.)+/g, '��')
                    .replace(/^��$/, '��Ԫ��');
        };
		/*�ܽ��input�ʹ�дinput��ͬ��*/
        function tran(obj1,obj2){
            var area3=$("#area3")
            var area1=$("#area")
            var area2=$("#area2")
            var val=area1.val()-area2.val()
            obj2.bind("input propertychange",function(ev){
                var val=digitUppercase(Number($(this).val()));/*obj2��ֵת��Ϊ��д֮��ͬ����obj1��*/
                obj1.val(val)
            })
        }
		/*ɾ���ṹ���ܽ��input�ʹ�дinput��ͬ��*/
        function tran2(obj1,obj2){
            var area3=$("#area3")
            var area1=$("#area")
            var area2=$("#area2")
            var val=area1.val()-area2.val()
            area3.val(val)
            try{
                var val=digitUppercase(Number(obj2.val()));/*obj2��ֵת��Ϊ��д֮��ͬ����obj1��*/
                obj1.val(val)
            }catch(e)
            {

            }
        }
		/*ɾ���ṹ���дinput��ͬ����������ܽ����ͬ��*/
        function tran3(obj1,obj2){
            var area3=$("#area3")
            var area1=$("#area")
            var area2=$("#area2")
            var val=area1.val()-area2.val()
            var val=obj1.val()
            obj2.val(val)/*obj2��ֵ��ͬ����obj1��*/
        }
        //���庯��
        //���ܽ���Զ����㼰ͬ�� objΪ�� zΪ��Ҫ�ϼƵı��кż�ȥ1 name �Ǳ���������ӵ�ͳһ���� ��Ҫ����������class all_01  ��Ҫ��������ͬ���ı���������m(������id��λ)
        //s_table_2��input�����ڵ���һ�еķ�Ʊ���͵�һ��option����
		/*�������*/
        function evalue2(obj,name1,name2,name3){
            var val=Number(obj.find("."+name1).val())-Number(obj.find("."+name2).val())
            var par=obj.parent();
            var par2=par.find("."+name3);
            var l=par2.length;
            var s2=0;
            obj.find("."+name3).val(val)
            par2.each(function(m,n){
                if(m!=(l-1))
                {
                    var val=$(this).val();
                    val=val==""?0:Number(val);
                    s2+=val;
                }
                else
                {
                    $(this).val(s2)
                }
            })
        }
        function evalue(obj,z,m,name){
            z=z||"";
            var flag3
            var m1=$("#cash_trans_1");
            var n1=$("#cash_trans_22");
            var m2=$("#cash_trans_3");
            var n2=$("#cash_trans_4");
			/*��Ҫ���д�Сдת��������input��*/
            var stb=obj;
            var tr=stb.find("tr");
            var reg=new RegExp("[A-Za-z`~!@#$^&*()=|{}':;',\\[\\]<>/?~��@#������&*��������|{}��������������'��������\u4e00-\u9fa5\-]+","g");/*�����ų������������������ʽ*/
            var area=$(m+'');/*��Ʊ�ܽ��*/
            var s=0;
            tr.each(function(m,n){
                var that=$(this);
                var td=$(this).find("td");
                var td_8=td.eq(z);
                var input=td_8.find("input");
                input.attr("last",0);
                var flag=true;
				/*Ϊs_table_2�������ÿ��tr�е�select���¼�����ֵ��Ϊ��ʱ�ı�data-numֵʹ�ÿ�������*/
                if(obj.attr("class")=="s_table_2")
                {
                    var select=that.find("select")
					/*ͨ��funds���ж�������·��*/
					if(funds(flag3))
					{
                        select.bind("change propertychange",function(ev){
                            if($(this).val()=="")
                            {
                                $(this).attr("data-num"," ")
                            }
                            else
                            {
                                $(this).attr("data-num",1)
                                var input=that.find("input:text")
                                input.each(function(m,n){
                                    if(isIe())
                                    {
                                        $(this).removeClass("ac")
                                        $(this).val("")
                                    }
                                    else
                                    {
                                        $(this).attr("placeholder","")
                                        $(this).removeClass("ac")
                                    }
                                })
                            }
                            var opt=$(this).find("option").eq(1)
                            if(opt.prop("selected")==true)
                            {
                                var par=$(this).parent().parent()
                                var bro=par.find("td:nth-of-type(5)")
								/*��Ʊ������¼�*/
								bro.bind("input propertychange",function(ev){
								    var em=$(this).find("em")
									em.remove()
								})
                                var em1=bro.find("em")
                                em1.remove()
                                var em=$("<em>*</em>")
                                bro.css({
                                    position:"relative"
                                })
                                em.css({
                                    color:"red",
                                    fontSize:"14px",
                                    position:"absolute",
                                    right:"5px",
                                    top:"center"
                                })
                                em.appendTo(bro)
                            }
                            else
                            {
                                var em=$(this).parent().parent().find("td:nth-of-type(5)").find()("em")
                                if(em.length>0)
                                {
                                    em.each(function(m,n){
                                        $(this).remove()
                                    })
                                }
                            }
                        })
					}
					else
					{
					    select.attr("disabled",true)
                        select.css("cursor","not-allowed")
					}
                }
				/*��ÿһ����Ҫͳ���ܽ����������¼�*/
                input.bind("input propertychange",function(ev){
					/*������s_table_2����s_table_1ִ�в�ͬ���߼�*/
                    if(obj.attr("class")=="s_table_2")
                    {
                        /*ͨ��funds���ж�������·��*/
                        if(funds_2()=="funds"||funds_2()=="advance"||funds_2()=="customer")
						{
                            that.find("input").each(function(m,n){
                                $(this).removeClass("ac")
                                $(this).attr("placeholder","");
                            })
                            $(this).removeClass("ac");
                            $(this).attr("placeholder","");
							/*��ȡinput���ֵ*/
                            var val=$(this).val();
							/*�ж�val���Ƿ��зǷ��ַ�*/
                            if(reg.test(val))
                            {
                                $(this).val("");
                                $(this).addClass("ac");
                                $(this).attr("placeholder","����������");
                                reg.lastIndex=0
                            }
                            else
                            {
								/*��valת��Ϊ���鲢���жϵ�һ�������Ƿ�Ϊ0��val��ֵ����0*/
                                var arr=val.split("0");
                                var l=arr.length;
                                if(l==2)
                                {
                                    if(arr[0]==""&&arr[1]!="")
                                    {
                                        $(this).val("");
                                        $(this).addClass("ac");
                                        $(this).attr("placeholder","����������");
                                    }
                                    else
                                    {
                                        evalue2(that,"all_01","all_03","all_04")
                                        $(this).removeClass("ac");
                                        $(this).attr("placeholder","");
                                        var val=parseFloat($(this).val())
                                        $(this).attr("last",val)
                                        var par2=$(this).parent().parent();
										/*���»�ȡstb��ֹ����td���Ҳ���input��ֵ*/
                                        var stb=obj;
                                        var all_in=stb.find("."+name)
                                        var s=0;
                                        all_in.each(function(m,n){
                                            var val=$(this).val();
                                            var l=all_in.length-1
                                            if(m!=l)
                                            {
                                                if(val)
                                                {
                                                    val=Number(val);
                                                    s+=val;
                                                }
                                            }
                                            else
                                            {
                                                $(this).val(s)
                                                if(obj.attr("class")=="s_table_2"&&z==8)
                                                {
                                                    area.val(s)
                                                }
                                            }
                                        })
                                    }
                                }
                                else
                                {
                                    if(arr[0]=="")
                                    {
                                        var lval=$(this).attr("last");
                                        var stb=obj;
                                        var all_in=stb.find("."+name);
                                        var val3=all_in.eq((all_in.length)-1);
                                        var val=parseFloat(val3.val());
                                        val-=lval;
                                        val3.val(val);
                                        if(obj.attr("class")=="s_table_2"&&z==8)
                                        {
                                            area.val(val);
                                            tran2(m1,n1);
                                        }
                                        $(this).attr("last",0);
                                    }
                                    else
                                    {
                                        evalue2(that,"all_01","all_03","all_04")
                                        var val=parseFloat($(this).val());
                                        $(this).attr("last",val)
                                        $(this).removeClass("ac");
                                        $(this).attr("placeholder","");
										/*���»�ȡstb��ֹ����td���Ҳ���input��ֵ*/
                                        var stb=obj;
                                        var all_in=stb.find("."+name);
                                        var s=0;
                                        all_in.each(function(m,n){
                                            var val=$(this).val();
                                            var l=all_in.length-1;
                                            if(m!=l)
                                            {
                                                if(val)
                                                {
                                                    val=Number(val);
                                                    s+=val;
                                                }
                                            }
                                            else
                                            {
                                                $(this).val(s);
                                                if(obj.attr("class")=="s_table_2"&&z==8)
                                                {
                                                    area.val(s)
                                                    tran2(m1,n1);
                                                }
                                            }
                                        })
                                        console.log(s)
                                    }
                                }
                            }
						}
						else
						{
                            var par=$(this).parent().parent()/*�ҵ����������tr�ĵ�һ��select��������ֵ�������Ƿ���Դ����Զ�ͳ���¼�*/
                            var select=par.find("select");
                            if(select.attr("data-num")=="")/*selectû��ѡȡֵ��ʱ�򲻴����¼� flag3Ϊfundsҳ��û��select֮���������Ϊ׼��*/
                            {
                                $(this).val("")
								$(this).addClass("ac")
								var pa=select.parent()
								var em_1=pa.find("em")
								if(em_1)
								{
								    em_1.each(function(m,n){
								        $(this).remove()
									})
								}
								var em=$("<em>*</em>")
								pa.css({
								    position:"relative"
								});
								em.css({
								    position:"absolute",
									color:"red",
									fontSize:"14px",
									right:"5px",
									top:"center"
								})
								em.appendTo(pa)
                                return
                            }
                            else
                            {
                                var em=select.parent().find("em")
								em.each(function(m,n){
								    $(this).remove()
								})
                                that.find("input").each(function(m,n){
                                    $(this).removeClass("ac")
                                    $(this).attr("placeholder","");
                                })
                                $(this).removeClass("ac");
                                $(this).attr("placeholder","");
								/*��ȡinput���ֵ*/
                                var val=$(this).val();
								/*�ж�val���Ƿ��зǷ��ַ�*/
                                if(reg.test(val))
                                {
                                    $(this).val("");
                                    $(this).addClass("ac");
                                    $(this).attr("placeholder","����������");
                                    reg.lastIndex=0
                                }
                                else
                                {
									/*��valת��Ϊ���鲢���жϵ�һ�������Ƿ�Ϊ0��val��ֵ����0*/
                                    var arr=val.split("0");
                                    var l=arr.length;
                                    if(l==2)
                                    {
                                        if(arr[0]==""&&arr[1]!="")
                                        {
                                            $(this).val("");
                                            $(this).addClass("ac");
                                            $(this).attr("placeholder","����������");
                                        }
                                        else
                                        {
                                            evalue2(that,"all_01","all_03","all_04")
                                            $(this).removeClass("ac");
                                            $(this).attr("placeholder","");
                                            var val=parseFloat($(this).val())
                                            $(this).attr("last",val)
                                            var par2=$(this).parent().parent();
											/*���»�ȡstb��ֹ����td���Ҳ���input��ֵ*/
                                            var stb=obj;
                                            var all_in=stb.find("."+name)
                                            var s=0;
                                            all_in.each(function(m,n){
                                                var val=$(this).val();
                                                var l=all_in.length-1
                                                if(m!=l)
                                                {
                                                    if(val)
                                                    {
                                                        val=Number(val);
                                                        s+=val;
                                                    }
                                                }
                                                else
                                                {
                                                    $(this).val(s)
                                                    if(obj.attr("class")=="s_table_2"&&z==8)
                                                    {
                                                        area.val(s)
                                                    }
                                                }
                                            })
                                        }
                                    }
                                    else
                                    {
                                        if(arr[0]=="")
                                        {
                                            var lval=$(this).attr("last");
                                            var stb=obj;
                                            var all_in=stb.find("."+name);
                                            var val3=all_in.eq((all_in.length)-1);
                                            var val=parseFloat(val3.val());
                                            val-=lval;
                                            val3.val(val);
                                            if(obj.attr("class")=="s_table_2"&&z==8)
                                            {
                                                area.val(val);
                                                tran2(m1,n1);
                                            }
                                            $(this).attr("last",0);
                                        }
                                        else
                                        {
                                            evalue2(that,"all_01","all_03","all_04")
                                            var val=parseFloat($(this).val());
                                            $(this).attr("last",val)
                                            $(this).removeClass("ac");
                                            $(this).attr("placeholder","");
											/*���»�ȡstb��ֹ����td���Ҳ���input��ֵ*/
                                            var stb=obj;
                                            var all_in=stb.find("."+name);
                                            var s=0;
                                            all_in.each(function(m,n){
                                                var val=$(this).val();
                                                var l=all_in.length-1;
                                                if(m!=l)
                                                {
                                                    if(val)
                                                    {
                                                        val=Number(val);
                                                        s+=val;
                                                    }
                                                }
                                                else
                                                {
                                                    $(this).val(s);
                                                    if(obj.attr("class")=="s_table_2"&&z==8)
                                                    {
                                                        area.val(s)
                                                        tran2(m1,n1);
                                                    }
                                                }
                                            })
                                            console.log(s)
                                        }
                                    }
                                }
                            }
						}
                    }
                    else/*class��������s_table_2�ı���Զ������������߼�·���޸ĵ�ʱ���������е��߼�*/
                    {
						/*��ȡinput���ֵ*/
                        var val=$(this).val();
						/*�ж�val���Ƿ�������*/
                        if(reg.test(val))/*�����ų�������*/
                        {
                            $(this).val("");
                            $(this).addClass("ac");
                            $(this).attr("placeholder","����������");
                            reg.lastIndex=0
                        }
                        else/*����Ϊ����*/
                        {
                            var arr=val.split("0");/*��valת��Ϊ���鲢���жϵ�һ�������Ƿ�Ϊ0��val��ֵ����0*/
                            var l=arr.length;
                            if(l==2)
                            {
                                if(arr[0]==""&&arr[1]!="")/*�ų�0xxx���͵�����ֵ*/
                                {
                                    $(this).val("");
                                    $(this).addClass("ac");
                                    $(this).attr("placeholder","����������");
                                }
                                else/*m0���͵�����ֵ��ȷ������ֵ*/
                                {
                                    $(this).removeClass("ac");
                                    $(this).attr("placeholder","");
                                    var val=parseFloat($(this).val());
                                    $(this).attr("last",val);
									/*���»�ȡstb��ֹ����td���Ҳ���input��ֵ*/
                                    var stb=obj;
                                    var all_in=stb.find("."+name);
                                    var s=0;
                                    all_in.each(function(m,n){
                                        var val=$(this).val();
                                        var l=all_in.length-1;
                                        if(m!=l)
                                        {
                                            if(val)
                                            {
                                                val=Number(val);
                                                s+=val;/*�����е�������ֵ����s֮��ӵ��ܽ�����*/
                                            }
                                        }
                                        else
                                        {
                                            $(this).val(s);/*�ܽ�ֵ*/
                                            if(obj.attr("class")=="s_table_2"&&z==8)/*Ԥ���ռ�Ϊ�Ժ���Զ���������λ���ñ����Լ��Զ������е��кż�ȥ1��Ϊxyֵ��λ����z���Ը���*/
                                            {
                                                area.val(s);
                                                tran2(m1,n1);
                                            }
                                            if(obj.attr("class")=="s_table_1"&&z==2)/*Ԥ���ռ�Ϊ�Ժ���Զ���������λ���ñ����Լ��Զ������е��кż�ȥ1��Ϊxyֵ��λ����*/
                                            {
                                                area.val(s);
                                                tran2(m2,n2);
                                            }
                                        }
                                    });
                                }
                            }
                            else
                            {
                                if(arr[0]=="")/*�ų�00xxxx���͵�����ֵ*/
                                {
                                    var lval=$(this).attr("last");
                                    var stb=obj
                                    var all_in=stb.find("."+name);/*��������ӵ�е�����input������Ϊname*/
                                    var val3=all_in.eq((all_in.length)-1);/*�ܽ���*/
                                    var val=parseFloat(val3.val());
                                    val-=lval;
                                    val3.val(val);/*�ܽ�ֵ*/
                                    if(obj.attr("class")=="s_table_2"&&z==8)/*Ԥ���ռ�Ϊ�Ժ���Զ���������λ���ñ����Լ��Զ������е��кż�ȥ1��Ϊxyֵ��λ����*/
                                    {
                                        area.val(val);
                                        tran2(m1,n1);
                                    }
                                    if(obj.attr("class")=="s_table_1"&&z==2)/*Ԥ���ռ�Ϊ�Ժ���Զ���������λ���ñ����Լ��Զ������е��кż�ȥ1��Ϊxyֵ��λ����*/
                                    {
                                        area.val(s);
                                        tran2(m2,n2);
                                    }
                                    $(this).attr("last",0);
                                }
                                else/*��ȷ������ֵ*/
                                {
                                    var val=parseFloat($(this).val());
                                    $(this).attr("last",val);
                                    $(this).removeClass("ac");
                                    $(this).attr("placeholder","");
									/*���»�ȡstb��ֹ����td���Ҳ���input��ֵ*/
                                    var stb=obj;
                                    var all_in=stb.find("."+name);/*��������ӵ�е�����input������Ϊname*/
                                    var s=0;
                                    all_in.each(function(m,n){
                                        var val=$(this).val();
                                        var l=all_in.length-1;
                                        if(m!=l)
                                        {
                                            if(val)
                                            {
                                                val=Number(val);
                                                s+=val;
                                            }
                                        }
                                        else
                                        {
                                            $(this).val(s);
                                            if(obj.attr("class")=="s_table_2")/*Ԥ���ռ�Ϊ�Ժ���Զ���������λ���ñ����Լ��Զ������е��кż�ȥ1��Ϊxyֵ��λ����*/
                                            {
                                                area.val(s);
                                                tran(m1,n1);
                                            }
                                            if(obj.attr("class")=="s_table_1"&&z==2)/*Ԥ���ռ�Ϊ�Ժ���Զ���������λ���ñ����Լ��Զ������е��кż�ȥ1��Ϊxyֵ��λ����*/
                                            {
                                                area.val(s);
                                                tran2(m2,n2);
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    }
                    control()
                });
            })
        }
        var span=$("span");
        span.each(function(m,n){
            var em=$(this).find("em");
            em.remove()
        });
        function change_1(){
            var short=$(".tinyshort");
            short.css({
                maxWidth:"96%"
            })
        }
		/*nameΪ�Զ����ӽṹ�ı�Ĵ�д������������������all_01*/
        function struct(name){
            var add1=$(".add_01");
            var del1=$(".delete_01");
            var stb1=$(".s_table_1");
            var flag=true;
            var tr=stb1.find("tr");
            var tr_01=tr.eq(1);
            var obj2=tr_01.clone();
            obj2.each(function(m,n){
                try{
                    var input=$(this).find("input")
                    var select=$(this).find("select")
                    var text=$(this).find("textarea")
                    input.each(function(m,n){
                        console.log("898")
                        $(this).val("")
                    })
                    select.each(function(m,n){
                        var op=$(this).find("option").attr("val","");
                        console.log(op)
                    })
                    text.each(function(m,n){
                        $(this).val("")
                    })
                }catch(e)
                {

                }
            });
            add1.bind("click",function(ev){
                var obj3=obj2.clone();
                var tr=stb1.find("tr");
                var l=tr.length-1;
                var tr_0=tr.eq(1);
                obj3.insertBefore(tr.eq(l));
                evalue($(".s_table_2"),8,"#area","all_01");
                evalue($(".s_table_2"),9,"","all_03");
                evalue($(".s_table_1"),2,"#area2","all_02");
                evalue($(".s_table_2"),10,"#area","all_04");
            })
            var c_box=stb1.find("input[type=checkbox]");
            var cb_01=c_box.eq(0);
            cb_01.bind("click",function(ev){
                var stb1=$(".s_table_1");
                var tr=stb1.find("tr");
                var c_box=stb1.find("input[type=checkbox]");
                var cb_01=c_box.eq(0);
                if(this.checked)
                {
                    for(var i=0;i<c_box.length;i++)
                    {
                        c_box[i].checked=true
                    }
                }
                else
                {
                    for(var i=0;i<c_box.length;i++)
                    {
                        c_box[i].checked=false
                    }
                }
            });
            del1.bind("click",function(ev){
                var stb1=$(".s_table_1");
                var tr=stb1.find("tr");
                var c_box=stb1.find("input[type=checkbox]");
                var cb_01=c_box.eq(0);
                var arr=[];
                var c_box=stb1.find("input[type=checkbox]");
                c_box.each(function(m,n){
                    if(this.checked)
                    {
                        if(m!=0)
                        {
                            arr.push(m)
                        }
                    }
                })
                for(var i=0;i<arr.length;i++)
                {
                    tr.eq(arr[i]).remove();
					/*ɾ��֮��ɸ��е�ֵҲɾȥ*/
                    var val=tr.eq(arr[i]).find("td input[class="+name+"]").val();
                    console.log(val)
                    console.log("������")
                    var clas="."+name
                    var val2=tr.eq((tr.length)-1).find(clas).val();
                    console.log("������2")
                    val2-=val;
                    tr.eq((tr.length)-1).find(clas).val(val2);
                    var m2=$("#cash_trans_3");
                    var n2=$("#cash_trans_4");
                    var m3=$("#area2")
                    tran2(m2,n2)
                    tran3(n2,m3)
                }
                var c_box=stb1.find("input[type=checkbox]");
                var c_box=stb1.find("input[type=checkbox]");
                c_box.eq(0).attr("checked",false)
            })
        }
        function struct2(name){
            var add1=$(".add_02");
            var del1=$(".delete_02");
            var stb1=$(".s_table_2");
            var flag=true;
            var tr=stb1.find("tr");
            var tr_01=tr.eq(1);
            var obj2=tr_01.clone();
            obj2.each(function(m,n){
                try{
                    var input=$(this).find("input")
                    var select=$(this).find("select")
                    var text=$(this).find("textarea")
                    input.each(function(m,n){
                        $(this).val("")
                    })
                    select.each(function(m,n){
                        var op=$(this).find("option")
                        op.each(function(m,n){
                            $(this).attr("selected",false)
                        })
                        var op1=$(this).find("option").eq(0).attr("selected",true)
                    })
                    text.each(function(m,n){
                        $(this).val("")
                    })
                }catch(e)
                {

                }
            });
            add1.bind("click",function(ev){
                var obj3=obj2.clone();
                var tr=stb1.find("tr");
                var l=tr.length-1;
                var tr_0=tr.eq(1);
                obj3.insertBefore(tr.eq(l))
                evalue($(".s_table_2"),8,"#area","all_01");
                evalue($(".s_table_2"),9,"","all_03");
                evalue($(".s_table_1"),2,"#area2","all_02");
                evalue($(".s_table_2"),10,"#area","all_04");
            })
            var c_box=stb1.find("input[type=checkbox]");
            var cb_01=c_box.eq(0);
            cb_01.bind("click",function(ev){
                var add1=$(".add_02");
                var del1=$(".delete_02");
                var stb1=$(".s_table_2");
                var c_box=stb1.find("input[type=checkbox]");
                var cb_01=c_box.eq(0);
                if(this.checked)
                {
                    for(var i=0;i<c_box.length;i++)
                    {
                        c_box[i].checked=true
                    }
                }
                else
                {
                    for(var i=0;i<c_box.length;i++)
                    {
                        c_box[i].checked=false
                    }
                }
            })
            //��Ʊɾ��
            del1.bind("click",function(ev){
                var del1=$(".delete_02");
                var stb1=$(".s_table_2");
                var tr=stb1.find("tr");
                var c_box=stb1.find("input[type=checkbox]");
                var cb_01=c_box.eq(0);
                var arr=[];
                var oavid_arr = []
                c_box.each(function(m,n){
                    if(this.checked)
                    {
                        if(m!=0)
                        {
                            arr.push(m)
                        }

                        //��ӷ�Ʊid������
                        if($(this).val()){
                            oavid_arr.push($(this).val())
                        }
                    }
                });

                for(var i=0;i<arr.length;i++)
                {
                    tr.eq(arr[i]).remove()
					/*ɾ��֮��ɸ��е�ֵҲɾȥ*/
                    var val=tr.eq(arr[i]).find("td").eq(8).find("input").val()
                    console.log("������")
                    var val2=tr.eq((tr.length)-1).find("."+name).val()
                    val2-=val;
                    tr.eq((tr.length)-1).find("."+name).val(val2)
                    var m1=$("#cash_trans_1");
                    var n1=$("#cash_trans_22");
                    var m2=$("#area")
                    tran2(m1,n1)
                    tran3(n1,m2)
                }
                var stb1=$(".s_table_2");
                var c_box=stb1.find("input[type=checkbox]");
                c_box.eq(0).attr("checked",false)

                //ɾ���ݸ��䷢Ʊ����
                if(oavid_arr){
                    var oavid_str = oavid_arr.join(',');
                    $.post('{#link}business/invoice/dodelinvoice', {id: oavid_str},
                        function (result) {
                        }
                    );
                }
            })
        }
		/*�Զ�ת����������*/
        var m1=$("#cash_trans_1");
        var n1=$("#cash_trans_22");
        var m2=$("#cash_trans_3");
        var n2=$("#cash_trans_4");
        tran(m1,n1);
        tran(m2,n2);
        evalue($(".s_table_2"),8,"#area","all_01");
        evalue($(".s_table_2"),9,"","all_03");
        evalue($(".s_table_2"),10,"","all_04");
        evalue($(".s_table_1"),2,"#area2","all_02");
        change_1();
        struct("all_01");
        struct2("all_01");
		/*1111*/
        function gray(){
			/*��ȡ��תĿ��*/
            var target=$("#oatype").val()
			/*��ò����б�����th*/
            var select=$(".select");
            var ul=select.find("ul");
            var li=ul.find("li");
			/*���ð������ûҵĸ�ѡ�������*/
            var gray_contain=[];
            gray_check(li,target)
        }
        function show(arr)
        {
            var translate=$(".translate");
            for(var i=0;i<arr.length;i++)
            {
                translate.eq(arr[i]).css({
                    display:"flex"
                })
            }
        }
        //����
        function biaoti(m){
			/*��ȡ��תĿ��*/
            var target=$("#oatype").val();
            var header=$("header");
            var top=header.find(".top");
            var bottom=header.find(".bottom");
            top.find("span").eq(2).html(m[0]);
            bottom.find("span").eq(1).html(m[1])
        }
		/*
		 * 0:��Ԥ������
		 * 1:����po
		 * 2:Cash-Transfer
		 * 3:Cash-Transfer
		 * 4:Cash-Transfer
		 * 5:��Ʒ���
		 * 6:�������
		 * 7����������
		 * 8:����Ԥ����
		 * 10:GBP
		 * 11:Ԥ�����5��
		 * 12:�ҳ�ŵ
		 * */
        function gray_check(obj,target){
            var arr_2=[];
            var arr3=[];
            var m=[];
            for(var i=0;i<obj.length;i++)
            {
                console.log(obj[i])
            }
			/*����ĳһ��ҳ��֮���������input��disabled�����Լ�disabled����*/
            var input=obj.find("input");
            input.each(function(m,n){
                $(this).attr("disabled",false);
                $(this).removeClass("disabled")
            });
            switch(target){
                case "invoice":
                    //��Ҳ���
                    arr_2=[[2,1],[0,0],[5,0],[13,1],[10,0],[3,0],[11,1],[4,0],[9,0]];arr3=[0,1,3];m=["��Ʊ�ύ","PV -Invoice Submission"];
                    $("#oaexpensetype").html('<option>��ѡ���������</option>');
                    break;
                case "advance":arr_2=[[2,1],[0,1],[13,0],[10,1],[3,1],[11,1],[4,0],[12,1]];arr3=[1,3];m=["Ԥ����","PV -Down Payment"];
                	destorypayment('advance')
                    $("#oaexpensetype").html('<option>��ѡ���������</option>');
                	//Ԥ�����ҳ�ŵΪ��ѡ��
                	html = '<em style="color: red; font-size: 14px; font-family: inherite;">*</em>'
                	$("input[name='oa_oaispromise']").next().append(html)
                    break;
                case "tender":arr_2=[[2,0],[0,1],[5,0],[13,0],[10,0],[3,1],[11,1],[4,1],[12,1]];arr3=[1,3];m=["ҽ��Ͷ�����Ԥ��������","PV -HS Bidding Related Down Payment"];
                    $("#oaexpensetype").html('<option>��ѡ���������</option>{$oaexpensetypebid}');
                    break;
                case "commission":arr_2=[[2,0],[0,0],[5,0],[13,0],[10,0],[3,0],[11,0],[4,1],[12,0]];arr3=[0,1,3];m=["ҽ��������Ŀ��ظ�������","PV -HS Sales Project Related Payment"];
                    $("#oaexpensetype").html('<option>��ѡ���������</option>{$oaexpensetype}');
                    break;
                case "customer":arr_2=[[2,0],[0,0],[5,0],[13,0],[10,0],[3,0],[11,0],[4,0],[12,0]];arr3=[2,3];m=["�Կͻ���֧������","PV -Customer Related Payment"];
                    $("#oaexpensetype").html('<option>��ѡ���������</option>');
                    destorypayment('customer')
                    break;
                case "staff":arr_2=[[2,0],[0,0],[5,0],[13,0],[10,0],[3,0],[11,0],[4,0],[12,0]];arr3=[2,3];m=["Ա���궩��ȡ���˿�","PV -Staff Shop Refund To Employee"];
                    $("#oaexpensetype").html('<option>��ѡ���������</option>');
                    destorypayment('staff')
                    var oa_oacurrency = $("select[name='oa_oacurrency'] option").remove()
                    $("select[name='oa_oacurrency']").append('<option value="1">CNY-�����</option>')
                    
                    break;
                case "funds":arr_2=[[1,0],[2,0],[0,0],[5,1],[6,1],[13,0],[10,0],[3,0],[11,0],[4,0],[12,0],[8,0],[9,0],[7,0]];arr3=[2,3];m=["�ʽ�ת","PV -Cash Transfer (C&C PTP Treasury)"];
                    $("#oaexpensetype").html('<option>��ѡ���������</option>');
                  	//C&C,PTP��Treasury����ѡ���Ǳ�ѡ��
                	html = '<em style="color: red; font-size: 14px; font-family: inherite;">*</em>'
                	$(".adujst_03").append(html)
                    break;
                    //GBP ��ǰ����
                    select2();
                //��Ʊ�ܽ���Ԥ���ܽ�� �Զ�����
            }
            show(arr3);
            biaoti(m);
            for(var i=0;i<arr_2.length;i++)
            {
                var m=arr_2[i];
                var li_target=obj.eq(m[0]);
                var operation=m[1];
                var child1=li_target.find("input,select")
                if(operation)
                {
                    child1.each(function(m,n) {
                        $(this).attr("disabled", false);
                        $(this).removeClass("disabled")
                    })
                }
                else
                {
                    child1.each(function(m,n){
                        $(this).attr("disabled",true);
                        $(this).addClass("disabled");
                    })
                    li_target.find("label").addClass("tip");
                    li_target.find(".contain span").addClass("tip");
                }
            }
        }
        gray()

        //�ݸ���
        draft()

        //��У��
        function form_check(){
			/*��ȡ��תĿ��*/
            var url=window.location.href;
            var target=$("#oatype").val()
            var input=$("input:text");
            var arr=[];
            var check_arr=["","",]
            input.each(function(m,n){
                if($(this).val()=="")
                {
                    if($(this).attr("disabled")!=true)
                    {
                        var parent_node=$(this).parent();
                        try{
                            var em1=parent_node.find("em");
                            if(em1)
                            {
                                em1.remove()
                            }
                        }catch(e){
                            console.log("������")
                        }
                        var em=$("<em class='empty'></em>");
                        em.insertAfter($(this));
                        $(this).addClass("ac");
                        arr.push(parent_node);
                        flag=false
                    }
                }
            });
            if(arr.length>0)
            {
                return true
            }
        }
        function drawStar(arr,target){
            target=target||""
            if(target)
            {
                switch(target){
                    case "invoice":arr.push($(".uploadfile").eq(0));
                        break;
                    case "advance":arr.push($(".uploadfile").eq(0));
                        break;
                    case "tender":arr.push($(".uploadfile").eq(1));
                        break;
                    case "commission":arr.push($(".uploadfile").eq(0));
                        break;
                    case "customer":arr.push($(".uploadfile").eq(2));
                        break;
                    case "staff":arr.push($(".uploadfile").eq(2),$("input[name='oa_oabankname']").eq(0),$("input[name='oa_oabanaccount']").eq(0));
                        break;
                    case "funds":;
                        break;
                        //GBP ��ǰ����
                        select2();
                    //��Ʊ�ܽ���Ԥ���ܽ�� �Զ�����
                }
            }
            for(var i=0;i<arr.length;i++)
            {
                console.log(arr[i])
                var par=arr[i].parent();
                var em=$("<em>*</em>")
                em.css({
                    color:"red",
                    fontSize:"14px",
                    fontFamily:"inherite"
                })
                em.appendTo(par)
            }
        }

        function addstar(m,n){
            m.bind("click",function(ev){
                if($(this).prop("checked")==true){
                    console.log(n)
                    var pa=n.parent();
                    var em=$("<em>*</em>")
                    em.css({
                        color:"red",
                        fontSize:"14px",
                        fontFamily:"inherite"
                    })
                    em.appendTo(pa)
                }else{
                    var pa=n.parent();
                    var em=pa.find("em")
                    em.remove()
                }
            })
        }
		/*ȥ������*/
        function clearStar(arr)
        {
            for(var i=0;i<arr.length;i++)
            {
                var par=arr[i].parent();
                var em=par.find("em");
                em.remove()
            }
        }
		(function(){
            var flag=true;
            var flag2=true;
            var flag3=true;
            var flag4=true;
            function check(){
                /*��ȡ��תĿ��*/

                //��ʼ��
                var target=$("#oatype").val();
                var sub=$("#submit");
                var tj=$(".tijiao");
                var fo=$("form");
                var filethree_url=$("input[name='filethree_url']");
                var filefourteen_url=$("input[name='filefourteen_url']");
                var oa_oaorucode=$("select[name='oa_oaorucode']");
                var oa_oadepartment=$("input[name='oa_oadepartment']");
                var oa_oaaregion=$("select[name='oa_oaaregion']")
                var oa_oapayeename=$("input[name='oa_oapayeename']");
                var oa_oabankname=$("input[name='oa_oabankname']");
                var oa_oabanaccount=$("input[name='oa_oabanaccount']");
                var oa_oaswiftcode=$("input[name='oa_oaswiftcode']");
                var oa_oaiban=$("input[name='oa_oaiban']");
                var oa_isseapayment=$("input[name='oa_oaisseapayment']");
                var oa_oaispo=$("input[name='oa_oaispo']");
                var oa_oasappono= $("input[name='oa_oasappono']");
                var oa_oavendorcode = $("input[name='oa_oavendorcode']");
                var oa_oaispromise = $("#under_7");
                var oa_oapayableamt = $("input[name='oa_oapayableamt']");
                var oa_oacashtranstype=$("input[name='oa_oacashtranstype']");
                /*������*/
                var arr=[oa_oaorucode,oa_oadepartment,oa_oaaregion,oa_oapayeename];
                drawStar(arr,target);
                oa_isseapayment.eq(0).bind("click",function(ev){
                    if($(this).prop("checked")==true)
                    {
                        var brr=[];
                        brr.push(oa_oabankname,oa_oabanaccount,oa_oaswiftcode,oa_oaiban);
                        drawStar(brr)
                    }
                    else
                    {
                        var brr=[];
                        brr.push(oa_oabankname,oa_oabanaccount,oa_oaswiftcode,oa_oaiban);
                        clearStar(brr)
                    }
                });

                //��Ӧ�̲���Ļ�����Ҫ��������Ϣ����֮���Բ��
				if(funds_2()!="funds")
				{
                    oa_oavendorcode.blur(function(){
                        if(oa_oavendorcode.val() !=''){
                            oa_oabankname.removeClass("ac");
                            oa_oabanaccount.removeClass("ac");
                            oa_oaswiftcode.removeClass("ac");
                            oa_oaiban.removeClass("ac");
                        }
                    });
				}
				else {
                    oa_oavendorcode.blur(function(){
                        if(oa_oavendorcode.val() !=''){
                            oa_oabankname.removeClass("ac");
                            oa_oabanaccount.removeClass("ac");
                        }
                    });
				}

                //��ѡ��PO��־ʱ������дSAP PO���
                addstar(oa_oaispo.eq(0),oa_oasappono.eq(0));

                tj.bind("click",function(ev){
                    var fla=$(this).index();
                    if(fla==4)
                    {
                        $('#issave').val(2);
                        filethree_url.parent().css({
                            background:"rgba(30,159,255,1)"
                        });
                        filefourteen_url.parent().css({
                            background:"rgba(30,159,255,1)"
                        });
                        oa_oaorucode.removeClass("ac");
                        oa_oadepartment.removeClass("ac");
                        oa_oaaregion.removeClass("ac");
                        oa_oapayeename.removeClass("ac");
                        oa_oabankname.removeClass("ac");
                        oa_oabanaccount.removeClass("ac");
                        oa_oaswiftcode.removeClass("ac");
                        oa_oaiban.removeClass("ac");
                        oa_isseapayment.removeClass("ac");
                        oa_oaispo.removeClass("ac");
                        //�ļ�У��
                        var oaid = $('#oaid').val();
                        if(oaid){
                            if(target=="invoice"&&filethree_url.attr('value')=="")
                            {
                                flag=false;
                                filethree_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="commission"&&filethree_url.attr('value')=="")
                            {
                                flag=false;
                                filethree_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="customer"&&filefourteen_url.attr('value')=="")
                            {
                                flag=false;
                                filefourteen_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="staff"&&filefourteen_url.attr('value')=="")
                            {
                                flag=false;
                                filefourteen_url.parent().css({
                                    backgroundColor:"#f40"
                                })
                            }
                        }else{
                            if(target=="invoice"&&filethree_url.val()=="")
                            {
                                flag=false;
                                filethree_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="commission"&&filethree_url.val()=="")
                            {
                                flag=false;
                                filethree_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="customer"&&filefourteen_url.val()=="")
                            {
                                flag=false;
                                filefourteen_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="staff"&&filefourteen_url.val()=="")
                            {
                                flag=false;
                                filefourteen_url.parent().css({
                                    backgroundColor:"#f40"
                                })
                            }
                        }


                        if(oa_oaorucode.val()=="")
                        {
                            flag=false;
                            oa_oaorucode.addClass("ac");
                        }
                        if(oa_oadepartment.val()=="")
                        {
                            flag=false;
                            oa_oadepartment.addClass("ac");
                        }
                        if(oa_oaaregion.val()=="")
                        {
                            flag=false;
                            oa_oaaregion.addClass("ac");
                        }
                        if(oa_oapayeename.val()=="")
                        {
                            flag=false;
                            oa_oapayeename.addClass("ac");
                        }
                        if(oa_oapayeename.val()=="")
                        {
                            flag=false;
                            oa_oapayeename.addClass("ac");
                        }
                        if(!oa_oaispromise.prop("checked")&&!oa_oaispromise.prop("disabled"))
                        {
                            flag=false;
                        }
                        if(funds_2()=="staff")
                        {
                            if(oa_oabankname.val()=="")
                            {
                                flag=false;
                                oa_oabankname.addClass("ac");
                            }
                            if(oa_oabanaccount.val()=="")
                            {
                                flag=false;
                                oa_oabanaccount.addClass("ac");
                            }
                        }
                        if(funds_2()=="funds")
                        {
                            if(oa_oacashtranstype.eq(0).prop("checked")==false&&oa_oacashtranstype.eq(1).prop("checked")==false&&oa_oacashtranstype.eq(2).prop("checked")==false)
                            {
                                flag=false;
                                oa_oacashtranstype.parent().css({
                                    borderColor:"red"
                                });
                                oa_oacashtranstype.each(function(m,n){
                                    $(this).bind("change propertychange",function(ev){
                                        if($(this).prop("checked"))
                                        {
                                            $(this).parent().css({
                                                borderColor:"slategray"
                                            })
                                        }
                                    })
                                })
                            }
                            else{
                                oa_oacashtranstype.each(function(m,n){
                                    $(this).parent().css({
                                        borderColor:"slategray"
                                    })
                                })
                            }
                        }
                        if(oa_oapayableamt.val()<0)
                        {
                            flag=false;
                            alert("The clearing downpayment amount should less than or equal to the invoice total amount")
                        }
                        //ovaeapayment��ѡ����������� ��Ӧ�̲���Ļ�����Ҫ��������Ϣ����֮���Բ��
                        if(oa_isseapayment[0].checked)
                        {
                            if(oa_oavendorcode.val()=='')
							{
                                if(funds_2()=="funds")
                                {
                                    if(oa_oabankname.val()=="")
                                    {
                                        oa_oabankname.addClass("ac");
                                        flag2=false
                                    }
                                    if(oa_oabanaccount.val()=="")
                                    {
                                        oa_oabanaccount.addClass("ac");
                                        flag2=false

                                    }
                                    if(oa_isseapayment[0].checked )
                                    {
                                        if(oa_oabankname.val()=="")
                                        {
                                            flag=false
                                        }
                                        if(oa_oabanaccount.val()=="")
                                        {
                                            flag=false

                                        }
                                    }

                                }
                                else
                                {
                                    if(oa_oabankname.val()=="")
                                    {
                                        oa_oabankname.addClass("ac");
                                        flag2=false
                                    }
                                    if(oa_oabanaccount.val()=="")
                                    {
                                        oa_oabanaccount.addClass("ac");
                                        flag2=false

                                    }
                                    if(oa_oaswiftcode.val()=="")
                                    {
                                        oa_oaswiftcode.addClass("ac");
                                        flag2=false

                                    }
                                    if(oa_oaiban.val()=="")
                                    {
                                        oa_oaiban.addClass("ac");
                                        flag2=false

                                    }
                                    if(oa_isseapayment[0].checked )
                                    {
                                        if(oa_oabankname.val()=="")
                                        {
                                            flag=false
                                        }
                                        if(oa_oabanaccount.val()=="")
                                        {
                                            flag=false

                                        }
                                        if(oa_oaswiftcode.val()=="")
                                        {
                                            flag=false

                                        }
                                        if(oa_oaiban.val()=="")
                                        {
                                            flag=false

                                        }
                                    }

                                }
							}
							else
							{

							}
                        }
                        else
                        {
                            oa_oabankname.removeClass("ac");
                            oa_oabanaccount.removeClass("ac");
                        }
                        //��ѡ��PO��־ʱ������дSAP PO���
                        if(oa_oaispo[0].checked)
                        {

                            if(oa_oasappono.val()=="")
                            {
                                oa_oasappono.addClass("ac");
                                flag2=false
                            }
                        }
                        else
                        {
                            oa_oasappono.removeClass("ac");
                        }


                        if(!flag||!flag2)
                        {
                            var move=$(".layui-layer-move");
                            var shade=$(".layui-layer-shade");
                            var dia=$(".layui-layer-dialog");
                            move.remove();
                            shade.remove();
                            dia.remove();
                            flag=true;
                            flag2=true;
                            fo.unbind("submit")
                        }
                        else
                        {
                            fo.submit();
                            console.log(flag);
                            console.log(flag2);
                            console.log("����flag");
                            flag=true;
                            flag2=true
                        }
                    }
                    else{
                        $('#issave').val(1);
                        filethree_url.parent().css({
                            background:"rgba(30,159,255,1)"
                        });
                        filefourteen_url.parent().css({
                            background:"rgba(30,159,255,1)"
                        });
                        oa_oaorucode.removeClass("ac");
                        oa_oadepartment.removeClass("ac");
                        oa_oaaregion.removeClass("ac");
                        oa_oapayeename.removeClass("ac");
                        oa_oabankname.removeClass("ac");
                        oa_oabanaccount.removeClass("ac");
                        oa_oaswiftcode.removeClass("ac");
                        oa_oaiban.removeClass("ac");
                        oa_isseapayment.removeClass("ac");
                        oa_oaispo.removeClass("ac");
                        oa_oavendorcode.removeClass("ac")
                        oa_oabankname.addClass("ac");
                        //�ļ�У��
                        var oaid = $('#oaid').val();
                        if(oaid){
                            if(target=="invoice"&&filethree_url.attr('value')=="")
                            {
                                flag3=false;
                                filethree_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="commission"&&filethree_url.attr('value')=="")
                            {
                                flag3=false;
                                filethree_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="customer"&&filefourteen_url.attr('value')=="")
                            {
                                flag3=false;
                                filefourteen_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="staff"&&filefourteen_url.attr('value')=="")
                            {
                                flag3=false;
                                filefourteen_url.parent().css({
                                    backgroundColor:"#f40"
                                })
                            }
                        }else{
                            if(target=="invoice"&&filethree_url.val()=="")
                            {
                                flag3=false;
                                filethree_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="commission"&&filethree_url.val()=="")
                            {
                                flag3=false;
                                filethree_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="customer"&&filefourteen_url.val()=="")
                            {
                                flag3=false;
                                filefourteen_url.parent().css({
                                    backgroundColor:"#f40"
                                });
                            }
                            if(target=="staff"&&filefourteen_url.val()=="")
                            {
                                flag3=false;
                                filefourteen_url.parent().css({
                                    backgroundColor:"#f40"
                                })
                            }
                        }

                        if(oa_oaorucode.val()=="")
                        {
                            flag3=false;
                            oa_oaorucode.addClass("ac");
                        }
                        if(oa_oadepartment.val()=="")
                        {
                            flag3=false;
                            oa_oadepartment.addClass("ac");
                        }
                        if(oa_oaaregion.val()=="")
                        {
                            flag3=false;
                            oa_oaaregion.addClass("ac");
                        }
                        if(oa_oapayeename.val()=="")
                        {
                            flag3=false;
                            oa_oapayeename.addClass("ac");
                        }
                        if(!oa_oaispromise.prop("checked")&&!oa_oaispromise.prop("disabled"))
                        {
                            flag3=false;
                        }
                        if(funds_2()=="staff")
                        {
                            if(oa_oabanaccount.val()=="")
                            {
                                flag3=false;
                                oa_oabankname.addClass("ac");
                            }
                            if(oa_oabanaccount.val()=="")
                            {
                                flag3=false;
                                oa_oabanaccount.addClass("ac");
                            }
                        }
                        if(funds_2()=="funds")
                        {
                            if(oa_oacashtranstype.eq(0).prop("checked")==false&&oa_oacashtranstype.eq(1).prop("checked")==false&&oa_oacashtranstype.eq(2).prop("checked")==false)
                            {
                                flag3=false;
                                oa_oacashtranstype.parent().css({
                                    borderColor:"red"
                                });
                                oa_oacashtranstype.each(function(m,n){
                                    $(this).bind("change propertychange",function(ev){
                                        if($(this).prop("checked"))
                                        {
                                            $(this).parent().css({
                                                borderColor:"slategray"
                                            })
                                        }
                                    })
                                })
                            }
                            else{
                                oa_oacashtranstype.each(function(m,n){
                                    $(this).parent().css({
                                        borderColor:"slategray"
                                    })
                                })
                            }
                        }
                        if(oa_oapayableamt.val()<0)
                        {
                            flag3=false;
                            alert("The clearing downpayment amount should less than or equal to the invoice total amount")
                        }
                        //ovaeapayment��ѡ����������� ��Ӧ�̲���Ļ�����Ҫ��������Ϣ����֮���Բ��
                        if(oa_isseapayment[0].checked)
                        {
                            if(oa_oavendorcode.val()=='')
                            {
                                if(funds_2()=="funds")
                                {
                                    if(oa_oabankname.val()=="")
                                    {
                                        oa_oabankname.addClass("ac");
                                        flag4=false
                                    }
                                    if(oa_oabanaccount.val()=="")
                                    {
                                        oa_oabanaccount.addClass("ac");
                                        flag4=false

                                    }
                                    if(oa_isseapayment[0].checked )
                                    {
                                        if(oa_oabankname.val()=="")
                                        {
                                            flag3=false
                                        }
                                        if(oa_oabanaccount.val()=="")
                                        {
                                            flag3=false

                                        }
                                    }

                                }
                                else
                                {
                                    if(oa_oabankname.val()=="")
                                    {
                                        oa_oabankname.addClass("ac");
                                        flag4=false
                                    }
                                    if(oa_oabanaccount.val()=="")
                                    {
                                        oa_oabanaccount.addClass("ac");
                                        flag4=false

                                    }
                                    if(oa_oaswiftcode.val()=="")
                                    {
                                        oa_oaswiftcode.addClass("ac");
                                        flag4=false

                                    }
                                    if(oa_oaiban.val()=="")
                                    {
                                        oa_oaiban.addClass("ac");
                                        flag4=false

                                    }
                                    if(oa_isseapayment[0].checked )
                                    {
                                        if(oa_oabankname.val()=="")
                                        {
                                            flag3=false
                                        }
                                        if(oa_oabanaccount.val()=="")
                                        {
                                            flag3=false

                                        }
                                        if(oa_oaswiftcode.val()=="")
                                        {
                                            flag3=false

                                        }
                                        if(oa_oaiban.val()=="")
                                        {
                                            flag3=false

                                        }
                                    }

                                }
                            }
                            else
                            {

                            }
                        }
                        else
                        {
                            oa_oabankname.removeClass("ac");
                            oa_oabanaccount.removeClass("ac");
                        }
                        //��ѡ��PO��־ʱ������дSAP PO���
                        if(oa_oaispo[0].checked)
                        {
                            oa_oasappono.addClass("ac");

                            if(oa_oasappono.val()=="")
                            {
                                oa_oasappono.addClass("ac");
                                flag2=false
                            }
                        }
                        else
                        {
                            oa_oasappono.removeClass("ac");
                        }
                        if(!flag3||!flag4)
                        {
                            var move=$(".layui-layer-move");
                            var shade=$(".layui-layer-shade");
                            var dia=$(".layui-layer-dialog");
                            move.remove();
                            shade.remove();
                            dia.remove();
                            fo.unbind("submit")
                            flag3=true;
                            flag4=true;
                        }
                        else
                        {
                            fo.submit();
                        }
                    }
                })
            }
            function over_sea(){
                var money=$("select[name='oa_oacurrency']")
                var sea=$("input[name='oa_oaisseapayment']").eq(0)
                money.bind("change propertychange",function(ev){
                    var opt=$(this).find("option")
                    if($(this).val())
                    {
                        if($(this).val()==1)
                        {
                            var brr=[];
                            sea.prop("checked",false);
                            brr.push($("input[name='oa_oabankname']"),$("input[name='oa_oabanaccount']"),$("input[name='oa_oaswiftcode']"),$("input[name='oa_oaiban']"));
                            clearStar(brr)
                        }
                        else
                        {
                            var oa_oabankname=$("input[name='oa_oabankname']");
                            var oa_oabanaccount=$("input[name='oa_oabanaccount']");
                            var oa_oaswiftcode=$("input[name='oa_oaswiftcode']");
                            var oa_oaiban=$("input[name='oa_oaiban']");
                            var brr=[];
                            if(funds_2()=="funds")
							{
                                brr.push($("input[name='oa_oabankname']"),$("input[name='oa_oabanaccount']"))
							}
							else
							{
                                brr.push($("input[name='oa_oabankname']"),$("input[name='oa_oabanaccount']"),$("input[name='oa_oaswiftcode']"),$("input[name='oa_oaiban']"))
							}
                            sea.prop("checked",true);;
                            clearStar(brr)
                            drawStar(brr)
                        }
                    }
                })
            }
            over_sea()
            check();
		})()
        function remove_read(){
            var input=$("input");
            input.bind("keyup",function(ev){
                console.log($(this).val())
            })
        }
        function adujst(){
            var par=document.getElementsByClassName("adujst_01")[0];
            var top=par.getElementsByClassName("top")[0];
            console.log(top)
            var par_par=par.parentNode;
            var h=par_par.offsetHeight
            par.style.height=h+"px"
            top.textarea=function(){
                var par=this.parentNode;
                var height=par.offsetHeight;
                var text=this.getElementsByTagName("textarea")[0];
                this.style.height=height/2+"px";
            };
            top.textarea()
        }
        adujst();
    });
    function delet(){
        var att=$(".attention").eq(0)
        var par=att.parent()
        console.log(par)
        var p=par.find("p").eq(1)
        p.remove()
    }

	/*��ֹ�ֻ�Ĭ���¼�*/
    function tel(){
        var ul=$(".ul_1,.ul_2,.ul_3")
        console.log(ul)
    }
    function isIe(){
        return ("ActiveXObject" in window)
    }
    function funds(m){
        var target=$("input[name='oa_oatype']").val();
        if(target=="funds"||target=="advance"||target=="customer"||target=="staff")
        {
            /*������1���ӽṹ��ť����Ӧ�ĺ���*/
            var stb_1=$(".s_table_1").eq(0);
            var child=stb_1.find("input");
            console.log(child)
            child.each(function(m,n){
                $(this).prop("disabled",true)
            });
            var add=$(".tijiao3");
            add.each(function(m,n){
                $(this).unbind("click");
                var tr=$(".s_table_1").find("tr");
                tr.each(function(m,n){
                    if(m>1)
                    {
                        $(this).remove()
                    }
                })
            })
        }
        if(target=="funds")
        {
            var arr=[];
            var oa_oavendorcode=$("input[name='oa_oavendorcode']");
            var oa_oaswiftcode=$("input[name='oa_oaswiftcode']");
            var oa_oaiban=$("input[name='oa_oaiban']");
            arr.push(oa_oaswiftcode,oa_oaiban);
            for(var i=0;i<arr.length;i++)
            {
                arr[i].css({
                    cursor:"not-allowed"
                })
                arr[i].prop("disabled",true)
            }
        }
		if(target=="funds"||target=="advance"||target=="customer")
		{
		    m==true;
		    /*������Ԥ�����*/
		    var stb_1=$(".s_table_1").eq(0)
			var input=stb_1.find("input")
			input.each(function(m,n){
			    $(this).attr("disabled",true)
                $(this).css("cursor","not-allowed")
			});
		    /*����SAP PO number*/
		    var stb_2=$(".s_table_2").eq(0)
			var tr=stb_2.find("tr")
			tr.each(function(m,n){
			    var that=$(this)
			    if(m!=0)
				{
				    var td=$(this).find("td")
					td.each(function(m,n){
					    var index=$(this).index()
						if(target=="advance"||target=="customer"||target=="funds")
						{
                            if(index==4||index==5||index==6||index==7||index==9||index==10)
                            {
                                var input=$(this).find("input")
                                input.each(function(m,n){
                                    $(this).css({
                                        cursor:"not-allowed"
                                    })
                                    $(this).attr("disabled",true)
                                })
                            }
                            else
							{
                                var input=$(this).find("input")
								var par=$(this).parent().parent()
								var tr=par.find("tr")
								var tr_last=tr.eq(tr.length-1)
								var inn=tr_last.find("input")
                                var l=inn.length
                                inn.eq(l-1).attr("disabled",true)
                                inn.eq(l-1).css("cursor","not-allowed")
                                inn.eq(l-2).attr("disabled",true)
                                inn.eq(l-2).css("cursor","not-allowed")
								input.bind("input propertychange",function(ev){
								   var inp2=that.find("input").eq(9)
								   var inp=that.find("input").eq(8)
									inp.val("")
                                    inp2.val("")
                                    inn.eq(l-1).val("")
                                    inn.eq(l-2).val("")
								})
							}
						}
					})
				}
			})
			/*��������SAP PO number
				var snm=$("input[name='oa_oasappono']")
				var snm_bro=snm.siblings()
				snm.attr("disabled",true)
				snm.css("cursor","not-allowed")
				snm_bro.css({
					color:"gray"
				})
			*/
		    return false
		}
		else
		{
		    m=false
		    return true
		}
	}
    //��Ԥ��,����Ʊ��Ϣ����ʾ
    function destorypayment(type){
		    /*������Ԥ�����*/
		    var stb_1=$(".s_table_1").eq(0)
			var input=stb_1.find("input")
			input.each(function(m,n){
			    $(this).attr("disabled",true)
                $(this).css("cursor","not-allowed")
			});
		    if(type !='advance'){
		    	/*��������SAP PO number*/
				var snm=$("input[name='oa_oasappono']")
				var snm_bro=snm.siblings()
	            snm.attr("disabled",true)
	            snm.css("cursor","not-allowed")
	            snm_bro.css({
	                color:"gray"
				})
		    }
			/*��Ԥ�ܽ��*/
			var snm=$("input[name='oa_oadownpaymenttotalamt']")
			var snm_bro=snm.siblings()
            snm.attr("disabled",true)
            snm.css("cursor","not-allowed")
            snm_bro.css({
                color:"gray"
			})
			
			if(type =='staff'){
				var snm=$("input[name='oa_oaswiftcode']")
				  snm.attr("disabled",true)
				var snm=$("input[name='oa_oaiban']")
				  snm.attr("disabled",true)
			}else{
				/*��Ʊ������*/
				var snm=$("input[name='oa_oainvoicevolume']")
				var snm_bro=snm.siblings()
	            snm.attr("disabled",true)
	            snm.css("cursor","not-allowed")
	            snm_bro.css({
	                color:"gray"
				})
			}
	}
    
	function funds_2(){
        var target=$("input[name='oa_oatype']").val()
		return target
	}
function remove_red(){
	    var input=$(document).find("input");
        var select=$(document).find("select");
        input.each(function(m,n){
            $(this).bind("change",function(ev){
                try{
                    $(this).removeClass("ac")
                }catch(e){
                }
            })
        })
		select.each(function(m,n){
            $(this).bind("change",function(ev){
                try{
                    $(this).removeClass("ac")
                }catch(e){
                }
            })
		})
	}
function control(){
    var ar3=$("#area3");
    var ar2=$("#area2");
    var ar1=$("#area");
    var stb1=$(".s_table_1").eq(0);
    var stb2=$(".s_table_2").eq(0);
    var tr2=stb2.find("tr");
    var tr1=stb1.find("tr");
    tr2.each(function(m,n){
        if(m!=0)
        {
            var td=$(this).find("td:eq(8)");
            var input=td.find("input").eq(0);
            input.bind("input propertychange",function(ev){
                var val2=ar2.val();
                var val1=ar1.val();
                var val=val1-val2
                if(val<0)
                {
                    ar3.addClass("ac")
                    ar3.val("-1")
                }
                else
                {
                    ar3.removeClass("ac")
                }
            })
        }
    })
    tr1.each(function(m,n){
        if(m!=0)
        {
            var input=$(this).find(".all_02")
            input.bind("input propertychange",function(ev){
                var val2=ar2.val();
                var val1=ar1.val();
                var val=val1-val2
                if(val<0)
                {
                    ar3.addClass("ac")
                    ar3.val("-1")
                }
                else
                {
                    ar3.removeClass("ac")
                }
            })
        }
    })

}
function translate2(){
        var tran=$(".translate")
		tran.each(function(m,n){
			$(this).css({
				width:"100%"
			})
		})
}
function clear(){
        if(isIe())
		{
            var tran=$(".translate")
            tran.each(function(m,n){
                var input=$(this).find("input")
                var obj=input.clone();
                var span=$(this).find("span").eq(1)
                input.bind("change",function(ev){
                    var that=$(this)
                    setTimeout(function(){
                        var sm=$(".translate").find("small")
                        sm.bind("click",function(ev){
                            var label= $(this).parent().find("label").eq(0);
                            var input=label.find("input")
                            input.remove()
                            obj.appendTo(label)
                        })
                    },100)
                })
            })
		}
}
</script>