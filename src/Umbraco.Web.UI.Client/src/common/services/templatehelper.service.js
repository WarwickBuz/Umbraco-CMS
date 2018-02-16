(function () {
    'use strict';

    function templateHelperService(localizationService) {

        //crappy hack due to dictionary items not in umbracoNode table
        function getInsertDictionarySnippet(nodeName) {
            return "@Umbraco.GetDictionaryValue(\"" + nodeName + "\")";
        }

        function getInsertPartialSnippet(parentId, nodeName) {

            var partialViewName = nodeName.replace(".cshtml", "");

            if (parentId) {
                partialViewName = parentId + "/" + partialViewName;
            }

            return "@Html.Partial(\"" + partialViewName + "\")";
        }

        function getQuerySnippet(queryExpression) {
            var code = "\n@{\n" + "\tvar selection = " + queryExpression + ";\n}\n";
            code += "<ul>\n" +
                "\t@foreach(var item in selection){\n" +
                "\t\t<li>\n" +
                "\t\t\t<a href=\"@item.Url\">@item.Name</a>\n" +
                "\t\t</li>\n" +
                "\t}\n" +
                "</ul>\n\n";
            return code;
        }

        function getRenderBodySnippet() {
            return "@RenderBody()";
        }

        function getRenderSectionSnippet(sectionName, mandatory) {
            return "@RenderSection(\"" + sectionName + "\", " + mandatory + ")";
        }

        function getAddSectionSnippet(sectionName) {
            return "@section " + sectionName + "\r\n{\r\n\r\n\t{0}\r\n\r\n}\r\n";
        }

        function getGeneralShortcuts() {
            return {
                "name": localizationService.localize("shortcuts_generalHeader"),
                "shortcuts": [
                    {
                        "description": localizationService.localize("buttons_undo"),
                        "keys": [{ "key": "ctrl" }, { "key": "z" }]
                    },
                    {
                        "description": localizationService.localize("buttons_redo"),
                        "keys": [{ "key": "ctrl" }, { "key": "y" }]
                    },
                    {
                        "description": localizationService.localize("buttons_save"),
                        "keys": [{ "key": "ctrl" }, { "key": "s" }]
                    }
                ]
            };
        }

        function getEditorShortcuts() {
            return {
                "name": localizationService.localize("shortcuts_editorHeader"),
                "shortcuts": [
                    {
                        "description": localizationService.localize("shortcuts_commentLine"),
                        "keys": [{ "key": "ctrl" }, { "key": "/" }]
                    },
                    {
                        "description": localizationService.localize("shortcuts_removeLine"),
                        "keys": [{ "key": "ctrl" }, { "key": "d" }]
                    },
                    {
                        "description": localizationService.localize("shortcuts_copyLineUp"),
                        "keys": {
                            "win": [{ "key": "alt" }, { "key": "shift" }, { "key": "up" }],
                            "mac": [{ "key": "cmd" }, { "key": "alt" }, { "key": "up" }]
                        }
                    },
                    {
                        "description": localizationService.localize("shortcuts_copyLineDown"),
                        "keys": {
                            "win": [{ "key": "alt" }, { "key": "shift" }, { "key": "down" }],
                            "mac": [{ "key": "cmd" }, { "key": "alt" }, { "key": "down" }]
                        }
                    },
                    {
                        "description": localizationService.localize("shortcuts_moveLineUp"),
                        "keys": [{ "key": "alt" }, { "key": "up" }]
                    },
                    {
                        "description": localizationService.localize("shortcuts_moveLineDown"),
                        "keys": [{ "key": "alt" }, { "key": "down" }]
                    }
                ]
            };
        }

        function getTemplateEditorShortcuts() {
            return {
                "name": "Umbraco", //No need to localise Umbraco is the same in all languages :)
                "shortcuts": [
                    {
                        "description": localizationService.format(["template_insert", "template_insertPageField"], "%0% %1%"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "v" }]
                    },
                    {
                        "description": localizationService.format(["template_insert", "template_insertPartialView"], "%0% %1%"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "p" }]
                    },
                    {
                        "description": localizationService.format(["template_insert", "template_insertDictionaryItem"], "%0% %1%"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "d" }]
                    },
                    {
                        "description": localizationService.format(["template_insert", "template_insertMacro"], "%0% %1%"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "m" }]
                    },
                    {
                        "description": localizationService.localize("template_queryBuilder"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "q" }]
                    },
                    {
                        "description": localizationService.format(["template_insert", "template_insertSections"], "%0% %1%"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "s" }]
                    },
                    {
                        "description": localizationService.localize("template_mastertemplate"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "t" }]
                    }
                ]
            };
        }

        function getPartialViewEditorShortcuts() {
            return {
                "name": "Umbraco", //No need to localise Umbraco is the same in all languages :)
                "shortcuts": [
                    {
                        "description": localizationService.format(["template_insert", "template_insertPageField"], "%0% %1%"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "v" }]
                    },
                    {
                        "description": localizationService.format(["template_insert", "template_insertMacro"], "%0% %1%"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "m" }]
                    },
                    {
                        "description": localizationService.format(["template_insert", "template_insertDictionaryItem"], "%0% %1%"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "d" }]
                    },
                    {
                        "description": localizationService.localize("template_queryBuilder"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "q" }]
                    }
                ]
            };
        }

        function getMediaTypeEditorShortcuts() {
            return {
                "name": localizationService.localize("main_sections"),
                "shortcuts": [
                    {
                        "description": localizationService.localize("shortcuts_navigateSections"),
                        "keys": [{ "key": "1" }, { "key": "3" }],
                        "keyRange": true
                    }
                ]
            },
                {
                    "name": localizationService.localize("general_listView"),
                    "shortcuts": [
                        {
                            "description": localizationService.localize("shortcuts_toggleListView"),
                            "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "l" }]
                        }
                    ]
                },
                {
                    "name": localizationService.localize("general_rights"),
                    "shortcuts": [
                        {
                            "description": localizationService.localize("shortcuts_toggleAllowAsRoot"),
                            "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "r" }]
                        },
                        {
                            "description": localizationService.localize("shortcuts_addChildNode"),
                            "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "c" }]
                        }
                    ]
                };
        }

        function getDocumentTypeEditorShortcuts() {
            return {
                "name": localizationService.localize("main_sections"),
                "shortcuts": [
                    {
                        "description": localizationService.localize("shortcuts_navigateSections"),
                        "keys": [{ "key": "1" }, { "key": "4" }],
                        "keyRange": true
                    }
                ]
            },
                {
                    "name": localizationService.localize("general_listView"),
                    "shortcuts": [
                        {
                            "description": localizationService.localize("shortcuts_toggleListView"),
                            "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "l" }]
                        }
                    ]
                },
                {
                    "name": localizationService.localize("general_rights"),
                    "shortcuts": [
                        {
                            "description": localizationService.localize("shortcuts_toggleAllowAsRoot"),
                            "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "r" }]
                        },
                        {
                            "description": localizationService.localize("shortcuts_addChildNode"),
                            "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "c" }]
                        }
                    ]
                },
                {
                    "name": localizationService.localize("treeHeaders_templates"),
                    "shortcuts": [
                        {
                            "description": localizationService.localize("shortcuts_addTemplate"),
                            "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "t" }]
                        }
                    ]
                };
        }

        function getTypeEditorShortcuts() {
            return {
                "name": localizationService.localize("shortcuts_shortcut"),
                "shortcuts": [
                    {
                        "description": localizationService.localize("shortcuts_addTab"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "t" }]
                    },
                    {
                        "description": localizationService.localize("shortcuts_addProperty"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "p" }]
                    },
                    {
                        "description": localizationService.localize("shortcuts_addEditor"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "e" }]
                    },
                    {
                        "description": localizationService.localize("shortcuts_editDataType"),
                        "keys": [{ "key": "alt" }, { "key": "shift" }, { "key": "d" }]
                    }
                ]
            };
        }

        ////////////

        var service = {
            getInsertDictionarySnippet: getInsertDictionarySnippet,
            getInsertPartialSnippet: getInsertPartialSnippet,
            getQuerySnippet: getQuerySnippet,
            getRenderBodySnippet: getRenderBodySnippet,
            getRenderSectionSnippet: getRenderSectionSnippet,
            getAddSectionSnippet: getAddSectionSnippet,
            getGeneralShortcuts: getGeneralShortcuts,
            getEditorShortcuts: getEditorShortcuts,
            getTemplateEditorShortcuts: getTemplateEditorShortcuts,
            getPartialViewEditorShortcuts: getPartialViewEditorShortcuts,
            getMediaTypeEditorShortcuts: getMediaTypeEditorShortcuts,
            getDocumentTypeEditorShortcuts: getDocumentTypeEditorShortcuts,
            getTypeEditorShortcuts: getTypeEditorShortcuts
        };

        return service;

    }

    angular.module('umbraco.services').factory('templateHelper', templateHelperService);


})();
