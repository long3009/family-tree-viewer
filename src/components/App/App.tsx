import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import type { Node, ExtNode } from "relatives-tree/lib/types";
import treePackage from "relatives-tree/package.json";
import ReactFamilyTree from "react-family-tree";
import { SourceSelect } from "../SourceSelect/SourceSelect";
import { PinchZoomPan, RefObject } from "../PinchZoomPan/PinchZoomPan";
import { FamilyNode } from "../FamilyNode/FamilyNode";
import { database } from "./firebase";
import { ref, set, child, get } from "firebase/database";
import {
  NODE_WIDTH,
  NODE_HEIGHT,
  SOURCES,
  DEFAULT_SOURCE,
  CustomNode,
} from "../const";
import { getNodeStyle } from "./utils";

import css from "./App.module.css";
import DialogInfo from "../DialogInfo/DialogInfo";
import calcTree from "relatives-tree";
import Select from "react-select";
import * as crypto from "crypto-js";
export default React.memo(function App() {
  const [source, setSource] = useState(DEFAULT_SOURCE);
  const [nodes, setNodes] = useState(SOURCES[source]);
  const firstNodeId = useMemo(() => nodes[0].id, [nodes]);
  const [rootId, setRootId] = useState(firstNodeId);

  const [selectId, setSelectId] = useState<string>();
  const [hoverId, setHoverId] = useState<string>();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<CustomNode>();
  const [options, setOptions] = useState([]);
  const [jsonURL, setJsonURL] = useState(process.env.REACT_APP_JSON_URL);
  // useEffect(() => {
  //   console.log("JSON url", process.env.REACT_APP_JSON_URL);
  //   fetch(jsonURL)
  //     .then((resp) => resp.json())
  //     .then((data) => Array.isArray(data) && setNodes(data))
  //     .catch(() => {});
  // }, [jsonURL]);
  React.useEffect(() => {
    getFromFirebase();
  }, []);
  const getFromFirebase = () => {
    const dbRef = ref(database);
    get(child(dbRef, `users`))
      .then((snapshot: any) => {
        if (snapshot.exists()) {
          //if not encrypted
          // const jsonData = snapshot.val();
          let cipherText = snapshot.val();
          let bytes = crypto.AES.decrypt(cipherText, "admin");
          const decrypted = bytes.toString(crypto.enc.Utf8);
          const jsonData = JSON.parse(decrypted);
          console.log("jsonData", jsonData);
          if (Array.isArray(jsonData)) {
            let listOptions: any = [];
            jsonData.forEach((item) => {
              if (!item.parents) item.parents = [];
              if (!item.siblings) item.siblings = [];
              if (!item.children) item.children = [];
              if (!item.spouses) item.spouses = [];
              listOptions.push({ value: item.id, label: item.info?.name });
            });
            setNodes(jsonData);
            setOptions(listOptions);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDismiss = () => {
    setIsOpen(false);
  };
  const resetRootHandler = useCallback(
    () => setRootId(firstNodeId),
    [firstNodeId],
  );

  const changeSourceHandler = useCallback(
    (value: string, nodes: readonly Readonly<Node>[]) => {
      setRootId(nodes[0].id);
      // setNodes(nodes);
      setSource(value);
      setSelectId(undefined);
      setHoverId(undefined);
    },
    [],
  );

  const selected = useMemo(
    () => nodes.find((item) => item.id === selectId),
    [nodes, selectId],
  );
  const openDialog = (node: CustomNode) => {
    setIsOpen(true);
    setSelectedNode(node);
    setHoverId(undefined);
  };
  const refPZ = useRef<RefObject>(null);
  const handleFocusToNode = (nodeId: string) => {
    const treeData = calcTree(nodes, { rootId });
    console.log("treeData", treeData);
    const node = treeData.nodes.find(
      (item) => item.id.toString() === nodeId.toString(),
    );
    if (node) {
      // console.log("node", node.left, node.top);
      const canvasWidth = (treeData.canvas.width * NODE_WIDTH) / 2;
      const canvasHeight = (treeData.canvas.height * NODE_HEIGHT) / 2;
      // console.log("canvasWidth", canvasWidth);
      // console.log("canvasHeight", canvasHeight);
      const x =
        ((treeData.canvas.width - node.left) / treeData.canvas.width) *
        canvasWidth;
      const y =
        ((treeData.canvas.height - node.top) / treeData.canvas.height) *
        canvasHeight;
      const translateX =
        window.innerWidth > canvasWidth
          ? 0
          : Math.floor(canvasWidth / 2 / window.innerWidth);
      const translateY =
        window.innerHeight > canvasHeight
          ? 0
          : Math.floor(canvasHeight / 2 / window.innerHeight);
      // console.log("translateX", translateX);
      // console.log("translateY", translateY);
      refPZ.current?.SetFocus(
        x - NODE_WIDTH / 2 - translateX * window.innerWidth,
        y - NODE_HEIGHT / 2 - translateY * window.innerHeight,
      );
      // console.log("windowWidth", window.innerWidth);
      // console.log("windowHeight", window.innerHeight);
      setHoverId(nodeId);
    }
  };
  const handleChangeOption = (event: any) => {
    console.log("Change option", event);
    if (event) {
      handleFocusToNode(event.value);
    }
  };
  return (
    <div className={css.root}>
      <div style={{ width: 400 }}>
        <Select
          options={options}
          onChange={(e) => handleChangeOption(e)}
          isClearable
          isSearchable
        />
      </div>

      {/* <button onClick={(e) => handleFocusToNode("4")}>Test</button> */}
      {nodes.length > 0 && (
        <PinchZoomPan
          min={0.5}
          max={2.5}
          captureWheel
          className={css.wrapper}
          ref={refPZ}
        >
          <ReactFamilyTree
            nodes={nodes}
            rootId={rootId}
            width={NODE_WIDTH}
            height={NODE_HEIGHT}
            className={css.tree}
            renderNode={(node: Readonly<CustomNode>) => (
              <FamilyNode
                key={node.id}
                node={node}
                isRoot={node.id === rootId}
                isHover={node.id === hoverId}
                onClick={openDialog}
                onSubClick={setRootId}
                style={getNodeStyle(node)}
              />
            )}
          />
        </PinchZoomPan>
      )}
      <DialogInfo
        isOpen={isOpen}
        onDismiss={handleDismiss}
        node={selectedNode}
      />
    </div>
  );
});
